using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class addDeezerLinkAndBPM : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06f86782-9146-4860-af0a-142f08d3ce49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad565aa9-8ed3-4ef4-b674-04352392e0d7");

            migrationBuilder.AddColumn<float>(
                name: "Bpm",
                table: "Tracks",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Tracks",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "256cd506-4ac1-415e-87c1-cf32df75bc63", "babd38a7-57c7-421a-920e-4b41a09c5da6", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "07ecff68-c384-41d2-b74e-fb9d68b6836d", "bbc67199-e9a9-43b1-ab19-7d66ced1fb78", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07ecff68-c384-41d2-b74e-fb9d68b6836d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "256cd506-4ac1-415e-87c1-cf32df75bc63");

            migrationBuilder.DropColumn(
                name: "Bpm",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Tracks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "06f86782-9146-4860-af0a-142f08d3ce49", "eb1e6d14-9798-4684-bea4-3cec7599508e", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ad565aa9-8ed3-4ef4-b674-04352392e0d7", "321e67e8-1757-4ea9-918a-fea214664cf0", "Application User", "application_user" });
        }
    }
}
