using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class InsertRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8784d998-a8c1-417d-b2aa-1f7fa872836c", "6f36a7f6-7a02-44a3-ad98-34e98d00b151", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6860c798-ec69-4674-a2a5-6f713fd4ff7b", "ff419914-d7f0-4689-9f9c-48e83509bd01", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6860c798-ec69-4674-a2a5-6f713fd4ff7b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8784d998-a8c1-417d-b2aa-1f7fa872836c");
        }
    }
}
