using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Si20k_Backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedUsersVouchersCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Dùng raw SQL để an toàn nếu DB đã có seed data (tránh PRIMARY KEY violation)

            // Categories
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = '4660b1e2-d4c1-4162-9973-02ac762d1b55')
                    INSERT INTO [Categories] ([Id],[CreatedAt],[Name],[UpdatedAt]) VALUES ('4660b1e2-d4c1-4162-9973-02ac762d1b55','2025-01-01',N'pants',NULL);
                IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = 'bac4a38e-e093-42fd-8b26-054f41b3d1ee')
                    INSERT INTO [Categories] ([Id],[CreatedAt],[Name],[UpdatedAt]) VALUES ('bac4a38e-e093-42fd-8b26-054f41b3d1ee','2025-01-01',N'jackets',NULL);
                IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = 'ecd905d9-4030-4440-8a39-40f2257cf10a')
                    INSERT INTO [Categories] ([Id],[CreatedAt],[Name],[UpdatedAt]) VALUES ('ecd905d9-4030-4440-8a39-40f2257cf10a','2025-01-01',N'shirts',NULL);
            ");

            // Users
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM [Users] WHERE [Id] = '00000000-0000-0000-0000-000000000001')
                    INSERT INTO [Users] ([Id],[Address],[CreatedAt],[Email],[FullName],[PasswordHash],[PhoneNumber],[RefreshToken],[Role],[TokenCreated],[TokenExpires],[UpdatedAt],[Username])
                    VALUES ('00000000-0000-0000-0000-000000000001',NULL,'2025-01-01','admin@si20k.com',N'Root Admin','$2a$11$ysmueFzp8i3JkEA/VC1OBuRuN6sD2IkqUeJ75Ji2m1oZqFhFK/nQ.','0123456789','','Admin',NULL,NULL,NULL,'admin');
                IF NOT EXISTS (SELECT 1 FROM [Users] WHERE [Id] = '00000000-0000-0000-0000-000000000002')
                    INSERT INTO [Users] ([Id],[Address],[CreatedAt],[Email],[FullName],[PasswordHash],[PhoneNumber],[RefreshToken],[Role],[TokenCreated],[TokenExpires],[UpdatedAt],[Username])
                    VALUES ('00000000-0000-0000-0000-000000000002',NULL,'2025-01-01','seller@si20k.com',N'Demo Seller','$2a$11$NcghptT3ej8INLT8rFIZWu22eBpa7hqcdLFlqaDxp6J47jxMymCsy','0987654321','','Seller',NULL,NULL,NULL,'Seller');
            ");

            // Vouchers
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM [Vouchers] WHERE [Id] = '00000000-0000-0000-0000-000000000011')
                    INSERT INTO [Vouchers] ([Id],[CreatedAt],[Description],[DiscountAmount],[DiscountType],[IsActive],[MaxDiscount],[MinOrder],[UpdatedAt],[VoucherCode])
                    VALUES ('00000000-0000-0000-0000-000000000011','2025-01-01',N'10% off for first order',10,'Percent',1,NULL,100000,NULL,'WELCOME10');
                IF NOT EXISTS (SELECT 1 FROM [Vouchers] WHERE [Id] = '00000000-0000-0000-0000-000000000012')
                    INSERT INTO [Vouchers] ([Id],[CreatedAt],[Description],[DiscountAmount],[DiscountType],[IsActive],[MaxDiscount],[MinOrder],[UpdatedAt],[VoucherCode])
                    VALUES ('00000000-0000-0000-0000-000000000012','2025-01-01',N'50,000 VND off orders from 1,000,000 VND',50000,'Fixed',1,NULL,1000000,NULL,'S50');
                IF NOT EXISTS (SELECT 1 FROM [Vouchers] WHERE [Id] = '00000000-0000-0000-0000-000000000013')
                    INSERT INTO [Vouchers] ([Id],[CreatedAt],[Description],[DiscountAmount],[DiscountType],[IsActive],[MaxDiscount],[MinOrder],[UpdatedAt],[VoucherCode])
                    VALUES ('00000000-0000-0000-0000-000000000013','2025-01-01',N'20% off up to 500,000 VND',20,'Percent',1,500000,500000,NULL,'SALE20');
                IF NOT EXISTS (SELECT 1 FROM [Vouchers] WHERE [Id] = '00000000-0000-0000-0000-000000000014')
                    INSERT INTO [Vouchers] ([Id],[CreatedAt],[Description],[DiscountAmount],[DiscountType],[IsActive],[MaxDiscount],[MinOrder],[UpdatedAt],[VoucherCode])
                    VALUES ('00000000-0000-0000-0000-000000000014','2025-01-01',N'15% off on summer collection',15,'Percent',1,NULL,300000,NULL,'SUMMER15');
            ");

            // Products
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000101')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000101','ecd905d9-4030-4440-8a39-40f2257cf10a','2025-01-01',12000,N'100% cotton, relaxed fit',N'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687',N'White T-shirt with Red Stripes',20000,2,'00000000-0000-0000-0000-000000000002',156,NULL);
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000102')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000102','ecd905d9-4030-4440-8a39-40f2257cf10a','2025-01-01',15000,N'Cotton tee, breathable',N'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687',N'White Basic T-shirt',20000,10,'00000000-0000-0000-0000-000000000002',405,NULL);
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000201')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000201','4660b1e2-d4c1-4162-9973-02ac762d1b55','2025-01-01',14000,N'Stretch denim, Korean style',N'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687',N'Blue Wide-Leg Jeans',20000,1,'00000000-0000-0000-0000-000000000002',143,NULL);
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000202')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000202','4660b1e2-d4c1-4162-9973-02ac762d1b55','2025-01-01',20000,N'Oversized trendy style',N'https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?q=80&w=687',N'Baggy Jeans',20000,9,'00000000-0000-0000-0000-000000000002',312,NULL);
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000301')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000301','bac4a38e-e093-42fd-8b26-054f41b3d1ee','2025-01-01',15000,N'Lightweight, good sun protection',N'https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687',N'Black Jacket',20000,2,'00000000-0000-0000-0000-000000000002',128,NULL);
                IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = '00000000-0000-0000-0000-000000000302')
                    INSERT INTO [Products] ([Id],[CategoryId],[CreatedAt],[CurrentPrice],[Description],[ImageUrl],[Name],[OriginalPrice],[Quantity],[SellerId],[SoldNumber],[UpdatedAt])
                    VALUES ('00000000-0000-0000-0000-000000000302','bac4a38e-e093-42fd-8b26-054f41b3d1ee','2025-01-01',20000,N'Thick material, eye-catching color mix',N'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072',N'Red-Black Jacket with Hood',25000,5,'00000000-0000-0000-0000-000000000002',56,NULL);
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000101"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000102"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000201"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000202"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000301"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000302"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Vouchers",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000011"));

            migrationBuilder.DeleteData(
                table: "Vouchers",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000012"));

            migrationBuilder.DeleteData(
                table: "Vouchers",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000013"));

            migrationBuilder.DeleteData(
                table: "Vouchers",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000014"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("4660b1e2-d4c1-4162-9973-02ac762d1b55"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("bac4a38e-e093-42fd-8b26-054f41b3d1ee"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("ecd905d9-4030-4440-8a39-40f2257cf10a"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"));
        }
    }
}
