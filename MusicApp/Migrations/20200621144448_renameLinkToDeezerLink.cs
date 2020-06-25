using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicApp.Migrations
{
    public partial class renameLinkToDeezerLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Link",
                table: "Tracks");

            migrationBuilder.AddColumn<string>(
                name: "DeezerLink",
                table: "Tracks",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "56bd48a7-4d35-4db3-93db-0c33ab127e79", "35401f5f-603f-4004-b478-99c7878fed50", "Guest", "guest" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4d376f8c-d336-400c-969b-55bf49510a01", "9cb6b474-7a79-47b3-b374-24a0f7eb78ae", "Application User", "application_user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d376f8c-d336-400c-969b-55bf49510a01");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "56bd48a7-4d35-4db3-93db-0c33ab127e79");

            migrationBuilder.DropColumn(
                name: "DeezerLink",
                table: "Tracks");

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Tracks",
                type: "nvarchar(max)",
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
    }
}
