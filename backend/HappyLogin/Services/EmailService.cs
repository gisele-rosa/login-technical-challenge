using System.Net.Mail;
using System.Net;

public class EmailService
{
    private readonly string _smtpServer;
    private readonly int _smtpPort;
    private readonly string _smtpUser;
    private readonly string _smtpPass;

    public EmailService(string smtpServer, int smtpPort, string smtpUser, string smtpPass)
    {
        _smtpServer = smtpServer;
        _smtpPort = smtpPort;
        _smtpUser = smtpUser;
        _smtpPass = smtpPass;
    }

    public void SendConfirmationEmail(string toEmail, string name, string confirmationUrl)
    {
        var body = $@"
            <h1>Confirme seu email</h1>
            <p>Olá, {name}, clique no botão abaixo para confirmar seu email e aproveitar os benefícios Happy:</p>
            <a href='{confirmationUrl}' style='padding:10px 20px; background-color:blue; color:white; text-decoration:none;'>Confirmar Email</a>";

        var mailMessage = new MailMessage(_smtpUser, toEmail)
        {
            From = new MailAddress(_smtpUser),
            Subject = "Confirme seu email",
            Body = body,
            IsBodyHtml = true
        };
        mailMessage.To.Add(toEmail);

        try
        {
            using (var smtpClient = new SmtpClient(_smtpServer))
            {
                smtpClient.Port = _smtpPort;
                smtpClient.Credentials = new NetworkCredential(_smtpUser, _smtpPass);
                smtpClient.EnableSsl = true;
                smtpClient.Send(mailMessage);
            }
        }
        catch (SmtpException ex)
        {
            Console.WriteLine($"Erro ao enviar email: {ex.Message}");
        }
    }
}
