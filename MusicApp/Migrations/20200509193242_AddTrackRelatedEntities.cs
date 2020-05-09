using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class AddTrackRelatedEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { "9413c0f6-e511-4d6d-98d3-a5b196cebde4", "2f84d692-07bb-488f-ad24-36207bc36e80", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9400dde9-5f9f-4ec6-a868-856f232d8fe0", "a1d3b4dd-5e86-46c6-a33d-756d4aa07bdd", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9400dde9-5f9f-4ec6-a868-856f232d8fe0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9413c0f6-e511-4d6d-98d3-a5b196cebde4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "57df7c06-381f-4e5d-863e-6ff5cdee3167", "6bb5f7fd-65d9-4a89-9be5-9f87615afd53", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5426236b-a320-4c5c-a150-08e8a86804fd", "8ffcd13b-74d6-44de-aa4f-c489a8b4efd0", "Application User", "application_user" });
        }
    }
}
