namespace HappyLogin.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public DateTime CreateDate { get; set; }

        public bool EmailConfirmed { get; set; }

        public string Token { get; set; } = string.Empty;
    }
}