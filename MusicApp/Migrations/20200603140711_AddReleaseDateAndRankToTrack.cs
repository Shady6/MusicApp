using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class AddReleaseDateAndRankToTrack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ec751c8-9fde-4558-958e-0d29ec8903b1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0d2649d-6c5b-40ce-be6c-1dc5d51d47d8");

            migrationBuilder.AddColumn<long>(
                name: "DeezerRank",
                table: "Tracks",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ReleaseDate",
                table: "Tracks",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "06f86782-9146-4860-af0a-142f08d3ce49", "eb1e6d14-9798-4684-bea4-3cec7599508e", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ad565aa9-8ed3-4ef4-b674-04352392e0d7", "321e67e8-1757-4ea9-918a-fea214664cf0", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06f86782-9146-4860-af0a-142f08d3ce49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad565aa9-8ed3-4ef4-b674-04352392e0d7");

            migrationBuilder.DropColumn(
                name: "DeezerRank",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Tracks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a0d2649d-6c5b-40ce-be6c-1dc5d51d47d8", "df58ea58-2428-4bb5-bec1-9f743b4fdab0", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3ec751c8-9fde-4558-958e-0d29ec8903b1", "cd10e75a-16e1-404f-be01-761af1f31ea9", "Application User", "application_user" });
        }
    }
}
