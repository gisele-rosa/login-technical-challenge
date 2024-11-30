using System.Net.Mail;
using System.Net;
using System.Reflection;

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
        var variables = new Dictionary<string, string> { { "name", name }, {"link", confirmationUrl } };
        var templateContent = GetEmailTemplate("confirmation_email", variables);

        var mailMessage = new MailMessage(_smtpUser, toEmail)
        {
            From = new MailAddress(_smtpUser),
            Subject = "Confirme seu email",
            Body = templateContent,
            IsBodyHtml = true
        };
        mailMessage.CC.Add(toEmail);

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

    private string BuildEmailTemplatePath(string emailTitle)
    {
        var assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        return Path.Combine(assemblyPath, "Templates", emailTitle);
    }

    private string GetEmailTemplate(string emailTitle, Dictionary<string, string> variables)
    {
        var emailFile = BuildEmailTemplatePath($"{emailTitle}.html");
        var emailFileContent = File.ReadAllText(emailFile);

        foreach ( var variable in variables )
        {
            emailFileContent = emailFileContent.Replace($"%{variable.Key}%", variable.Value);
        }

        return emailFileContent;
    }
}
