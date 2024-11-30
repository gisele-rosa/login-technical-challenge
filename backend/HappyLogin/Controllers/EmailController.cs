using Microsoft.AspNetCore.Mvc;
using HappyLogin.Dtos;
using HappyLogin.Entities;
using HappyLogin.Data;

namespace HappyLogin.Controllers
{
    [Route("api")]
    public class EmailController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly DataContext _context;

        public EmailController(ILogger<UserController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("confirm-email/{token}")]
        public IActionResult Register(string token)
        {
            var user = _context.Users.FirstOrDefault(u => u.Token == token);

            if (user == null)
            {
                return BadRequest("Token inválido ou expirado.");
            }

            user.EmailConfirmed = true;
            _context.SaveChanges();

            return Ok("Usuário confirmado com sucesso!");
        }
    }
}
