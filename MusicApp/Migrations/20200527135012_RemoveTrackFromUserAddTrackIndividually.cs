using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class RemoveTrackFromUserAddTrackIndividually : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0175577-bdbf-4575-a39f-52d44f5f76a5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dde0088b-11cd-4cf1-bb3e-bb3685cd912a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a0d2649d-6c5b-40ce-be6c-1dc5d51d47d8", "df58ea58-2428-4bb5-bec1-9f743b4fdab0", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3ec751c8-9fde-4558-958e-0d29ec8903b1", "cd10e75a-16e1-404f-be01-761af1f31ea9", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ec751c8-9fde-4558-958e-0d29ec8903b1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0d2649d-6c5b-40ce-be6c-1dc5d51d47d8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a0175577-bdbf-4575-a39f-52d44f5f76a5", "b8feb0bd-6fe6-48a6-bb1d-5c7b9bd1d025", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "dde0088b-11cd-4cf1-bb3e-bb3685cd912a", "e388f48b-bced-40d8-a496-5ffaf26ba94d", "Application User", "application_user" });
        }
    }
}
