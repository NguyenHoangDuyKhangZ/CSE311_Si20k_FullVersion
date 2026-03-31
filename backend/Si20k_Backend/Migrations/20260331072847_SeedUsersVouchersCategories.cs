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
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("4660b1e2-d4c1-4162-9973-02ac762d1b55"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "pants", null },
                    { new Guid("bac4a38e-e093-42fd-8b26-054f41b3d1ee"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "jackets", null },
                    { new Guid("ecd905d9-4030-4440-8a39-40f2257cf10a"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "shirts", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedAt", "Email", "FullName", "PasswordHash", "PhoneNumber", "RefreshToken", "Role", "TokenCreated", "TokenExpires", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), null, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@si20k.com", "Root Admin", "$2a$11$ysmueFzp8i3JkEA/VC1OBuRuN6sD2IkqUeJ75Ji2m1oZqFhFK/nQ.", "0123456789", "", "Admin", null, null, null, "admin" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), null, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "seller@si20k.com", "Demo Seller", "$2a$11$NcghptT3ej8INLT8rFIZWu22eBpa7hqcdLFlqaDxp6J47jxMymCsy", "0987654321", "", "Seller", null, null, null, "Seller" }
                });

            migrationBuilder.InsertData(
                table: "Vouchers",
                columns: new[] { "Id", "CreatedAt", "Description", "DiscountAmount", "DiscountType", "IsActive", "MaxDiscount", "MinOrder", "UpdatedAt", "VoucherCode" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000011"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "10% off for first order", 10m, "Percent", true, null, 100000m, null, "WELCOME10" },
                    { new Guid("00000000-0000-0000-0000-000000000012"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "50,000 VND off orders from 1,000,000 VND", 50000m, "Fixed", true, null, 1000000m, null, "S50" },
                    { new Guid("00000000-0000-0000-0000-000000000013"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "20% off up to 500,000 VND", 20m, "Percent", true, 500000m, 500000m, null, "SALE20" },
                    { new Guid("00000000-0000-0000-0000-000000000014"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "15% off on summer collection", 15m, "Percent", true, null, 300000m, null, "SUMMER15" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "CurrentPrice", "Description", "ImageUrl", "Name", "OriginalPrice", "Quantity", "SellerId", "SoldNumber", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000101"), new Guid("ecd905d9-4030-4440-8a39-40f2257cf10a"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 12000m, "100% cotton, relaxed fit", "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687", "White T-shirt with Red Stripes", 20000m, 2, new Guid("00000000-0000-0000-0000-000000000002"), 156, null },
                    { new Guid("00000000-0000-0000-0000-000000000102"), new Guid("ecd905d9-4030-4440-8a39-40f2257cf10a"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 15000m, "Cotton tee, breathable", "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687", "White Basic T-shirt", 20000m, 10, new Guid("00000000-0000-0000-0000-000000000002"), 405, null },
                    { new Guid("00000000-0000-0000-0000-000000000201"), new Guid("4660b1e2-d4c1-4162-9973-02ac762d1b55"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 14000m, "Stretch denim, Korean style", "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687", "Blue Wide-Leg Jeans", 20000m, 1, new Guid("00000000-0000-0000-0000-000000000002"), 143, null },
                    { new Guid("00000000-0000-0000-0000-000000000202"), new Guid("4660b1e2-d4c1-4162-9973-02ac762d1b55"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 20000m, "Oversized trendy style", "https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?q=80&w=687", "Baggy Jeans", 20000m, 9, new Guid("00000000-0000-0000-0000-000000000002"), 312, null },
                    { new Guid("00000000-0000-0000-0000-000000000301"), new Guid("bac4a38e-e093-42fd-8b26-054f41b3d1ee"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 15000m, "Lightweight, good sun protection", "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687", "Black Jacket", 20000m, 2, new Guid("00000000-0000-0000-0000-000000000002"), 128, null },
                    { new Guid("00000000-0000-0000-0000-000000000302"), new Guid("bac4a38e-e093-42fd-8b26-054f41b3d1ee"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 20000m, "Thick material, eye-catching color mix", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072", "Red-Black Jacket with Hood", 25000m, 5, new Guid("00000000-0000-0000-0000-000000000002"), 56, null }
                });
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
