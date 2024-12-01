using Microsoft.AspNetCore.Mvc;
using HappyLogin.Dtos;
using HappyLogin.Entities;
using HappyLogin.Data;

namespace HappyLogin.Controllers
{
    [Route("api")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly DataContext _context;
        private readonly EmailService _emailService;

        public UserController(ILogger<UserController> logger, DataContext context, EmailService emailService)
        {
            _logger = logger;
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto dto)
        {
            try
            {
                if (_context.Users.Any(u => u.Email == dto.Email))
                {
                    _logger.LogError("E-mail {Email} já está em uso.", dto.Email);
                    return BadRequest("Email já está em uso.");
                }

                var user = new User
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    CreateDate = DateTime.UtcNow,
                    EmailConfirmed = false
                };

                var confirmationToken = Guid.NewGuid().ToString();
                user.Token = confirmationToken;

                _context.Users.Add(user);
                _context.SaveChanges();

                var confirmationUrl = $"http://localhost:3000/confirmation?token={confirmationToken}";
                _emailService.SendConfirmationEmail(user.Email, user.Name, confirmationUrl);

                return Ok("Usuário registrado com sucesso!");
            } 
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Erro ao registrar o usuário.");
                return StatusCode(500, "Erro interno do servidor.");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(u => u.Email == dto.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                {
                    _logger.LogError("Credenciais inválidas e-mail: {email}", dto.Email);
                    return Unauthorized("Credenciais inválidas.");
                }

                if (!user.EmailConfirmed)
                {
                    _logger.LogError("e-mail: {email} não confirmado", dto.Email);
                    return StatusCode(StatusCodes.Status403Forbidden, "Email não confirmado!");
                }

                var response = new UserResponseDto
                {
                    Name = user.Name,
                    Email = user.Email,
                };

                return Ok(response);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Erro ao processar o login do usuário {Email}", dto.Email);
                return StatusCode(500, "Erro interno do servidor.");
            }
        }
    }
}
