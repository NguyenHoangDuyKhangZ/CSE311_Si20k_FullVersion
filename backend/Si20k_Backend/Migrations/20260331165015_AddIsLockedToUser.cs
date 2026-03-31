using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Si20k_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIsLockedToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"),
                columns: new[] { "IsLocked", "PasswordHash" },
                values: new object[] { false, "$2a$11$DdhZjrloIbeZJdUf74wG5.Ozwpts4BGS6NXdE6aCTaQ6KsXKgXogW" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"),
                columns: new[] { "IsLocked", "PasswordHash" },
                values: new object[] { false, "$2a$11$ercJabhplabdWnAtljLqtOsR4vyA0jgWasAv2WvmisOkjeQCMYlf." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"),
                column: "PasswordHash",
                value: "$2a$11$ZMg4sTbbqMvcuYhg5PXOpOI9lH88n3OSJP5V4kwphlz28334psbp6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"),
                column: "PasswordHash",
                value: "$2a$11$4b8OaATqO3JbHwUF1Scq8.WnzYzXGHGSaVBoiBnsSoYp30ignUhue");
        }
    }
}
