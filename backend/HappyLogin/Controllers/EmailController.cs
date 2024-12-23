﻿using Microsoft.AspNetCore.Mvc;
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
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Token == token);

                if (user == null)
                {
                    _logger.LogError("Token inválido");
                    return BadRequest("Token inválido ou expirado.");
                }

                user.EmailConfirmed = true;
                _context.SaveChanges();

                return Ok("Usuário confirmado com sucesso!");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Erro ao confirmar usuário");
                return StatusCode(500, "Erro interno do servidor.");
            }
        }
    }
}
