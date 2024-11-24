public class ApplicatioDbConext : DbContext
{
    public ApplicatioDbConext(DbContextOptions<ApplicationDApplicatioDbConext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HashIndex(u => u.Email).IsUnique();
        base.OnModelCreating(modelBuilder);
    }
}