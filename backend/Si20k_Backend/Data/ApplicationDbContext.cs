using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {

        // Table registrations
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình GUID tự động sinh ra cho tất cả Entity kế thừa BaseEntity
            // Điều này giúp bạn không cần gán Id thủ công trong code C#
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property("Id")
                        .HasDefaultValueSql("NEWSEQUENTIALID()");
                }
            }

            

            // Cấu hình riêng cho tiền tệ (Tránh lỗi cảnh báo precision)
            modelBuilder.Entity<Product>()
                .Property(p => p.CurrentPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Product>()
                .Property(p => p.OriginalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Voucher>()
                .Property(v => v.DiscountAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Voucher>()
                .Property(v => v.MinOrder)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Voucher>()
                .Property(v => v.MaxDiscount)
                .HasColumnType("decimal(18,2)");

            // Ràng buộc Email là duy nhất (Unique)
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<CartItem>()
            .HasOne(c => c.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // ===== SEED: Categories =====
            var shirtsCategoryId   = new Guid("ecd905d9-4030-4440-8a39-40f2257cf10a");
            var pantsCategoryId    = new Guid("4660b1e2-d4c1-4162-9973-02ac762d1b55");
            var jacketsCategoryId  = new Guid("bac4a38e-e093-42fd-8b26-054f41b3d1ee");

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = shirtsCategoryId,  Name = "shirts",  CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Category { Id = pantsCategoryId,   Name = "pants",   CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Category { Id = jacketsCategoryId, Name = "jackets", CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );

            // ===== SEED: Users =====
            var adminId  = new Guid("00000000-0000-0000-0000-000000000001");
            var sellerId = new Guid("00000000-0000-0000-0000-000000000002");

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id           = adminId,
                    FullName     = "Root Admin",
                    Username     = "admin",
                    Email        = "admin@si20k.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    Role         = "Admin",
                    PhoneNumber  = "0123456789",
                    CreatedAt    = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new User
                {
                    Id           = sellerId,
                    FullName     = "Demo Seller",
                    Username     = "Seller",
                    Email        = "seller@si20k.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Seller@123"),
                    Role         = "Seller",
                    PhoneNumber  = "0987654321",
                    CreatedAt    = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // ===== SEED: Vouchers =====
            modelBuilder.Entity<Voucher>().HasData(
                new Voucher
                {
                    Id             = new Guid("00000000-0000-0000-0000-000000000011"),
                    VoucherCode    = "WELCOME10",
                    DiscountType   = "Percent",
                    DiscountAmount = 10,
                    MinOrder       = 100000,
                    MaxDiscount    = null,
                    Description    = "10% off for first order",
                    IsActive       = true,
                    CreatedAt      = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Voucher
                {
                    Id             = new Guid("00000000-0000-0000-0000-000000000012"),
                    VoucherCode    = "S50",
                    DiscountType   = "Fixed",
                    DiscountAmount = 50000,
                    MinOrder       = 1000000,
                    MaxDiscount    = null,
                    Description    = "50,000 VND off orders from 1,000,000 VND",
                    IsActive       = true,
                    CreatedAt      = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Voucher
                {
                    Id             = new Guid("00000000-0000-0000-0000-000000000013"),
                    VoucherCode    = "SALE20",
                    DiscountType   = "Percent",
                    DiscountAmount = 20,
                    MinOrder       = 500000,
                    MaxDiscount    = 500000,
                    Description    = "20% off up to 500,000 VND",
                    IsActive       = true,
                    CreatedAt      = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Voucher
                {
                    Id             = new Guid("00000000-0000-0000-0000-000000000014"),
                    VoucherCode    = "SUMMER15",
                    DiscountType   = "Percent",
                    DiscountAmount = 15,
                    MinOrder       = 300000,
                    MaxDiscount    = null,
                    Description    = "15% off on summer collection",
                    IsActive       = true,
                    CreatedAt      = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // ===== SEED: Products (linked to seeded seller) =====
            var demoSellerId = sellerId;

            modelBuilder.Entity<Product>().HasData(
                // Shirts
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000101"),
                    Name = "White T-shirt with Red Stripes",
                    CurrentPrice = 12000, OriginalPrice = 20000,
                    Description = "100% cotton, relaxed fit",
                    ImageUrl = "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687",
                    CategoryId = shirtsCategoryId, SellerId = demoSellerId,
                    Quantity = 2, SoldNumber = 156,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000102"),
                    Name = "White Basic T-shirt",
                    CurrentPrice = 15000, OriginalPrice = 20000,
                    Description = "Cotton tee, breathable",
                    ImageUrl = "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687",
                    CategoryId = shirtsCategoryId, SellerId = demoSellerId,
                    Quantity = 10, SoldNumber = 405,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                // Pants
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000201"),
                    Name = "Blue Wide-Leg Jeans",
                    CurrentPrice = 14000, OriginalPrice = 20000,
                    Description = "Stretch denim, Korean style",
                    ImageUrl = "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687",
                    CategoryId = pantsCategoryId, SellerId = demoSellerId,
                    Quantity = 1, SoldNumber = 143,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000202"),
                    Name = "Baggy Jeans",
                    CurrentPrice = 20000, OriginalPrice = 20000,
                    Description = "Oversized trendy style",
                    ImageUrl = "https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?q=80&w=687",
                    CategoryId = pantsCategoryId, SellerId = demoSellerId,
                    Quantity = 9, SoldNumber = 312,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                // Jackets
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000301"),
                    Name = "Black Jacket",
                    CurrentPrice = 15000, OriginalPrice = 20000,
                    Description = "Lightweight, good sun protection",
                    ImageUrl = "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687",
                    CategoryId = jacketsCategoryId, SellerId = demoSellerId,
                    Quantity = 2, SoldNumber = 128,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Product
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000302"),
                    Name = "Red-Black Jacket with Hood",
                    CurrentPrice = 20000, OriginalPrice = 25000,
                    Description = "Thick material, eye-catching color mix",
                    ImageUrl = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072",
                    CategoryId = jacketsCategoryId, SellerId = demoSellerId,
                    Quantity = 5, SoldNumber = 56,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseEntity && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.UtcNow;
                }
            }
        }
    }
}
