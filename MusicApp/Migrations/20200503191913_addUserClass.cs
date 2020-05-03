using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class addUserClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6860c798-ec69-4674-a2a5-6f713fd4ff7b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8784d998-a8c1-417d-b2aa-1f7fa872836c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "57df7c06-381f-4e5d-863e-6ff5cdee3167", "6bb5f7fd-65d9-4a89-9be5-9f87615afd53", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5426236b-a320-4c5c-a150-08e8a86804fd", "8ffcd13b-74d6-44de-aa4f-c489a8b4efd0", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5426236b-a320-4c5c-a150-08e8a86804fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57df7c06-381f-4e5d-863e-6ff5cdee3167");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8784d998-a8c1-417d-b2aa-1f7fa872836c", "6f36a7f6-7a02-44a3-ad98-34e98d00b151", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6860c798-ec69-4674-a2a5-6f713fd4ff7b", "ff419914-d7f0-4689-9f9c-48e83509bd01", "Application User", "application_user" });
        }
    }
}
