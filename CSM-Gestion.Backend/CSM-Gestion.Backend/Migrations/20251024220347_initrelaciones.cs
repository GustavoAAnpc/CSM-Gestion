using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSM_Gestion.Backend.Migrations
{
    /// <inheritdoc />
    public partial class initrelaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_conyuge_asociado_AsociadoId1",
                table: "conyuge");

            migrationBuilder.DropForeignKey(
                name: "FK_hijo_asociado_AsociadoId1",
                table: "hijo");

            migrationBuilder.DropIndex(
                name: "IX_hijo_AsociadoId1",
                table: "hijo");

            migrationBuilder.DropIndex(
                name: "IX_conyuge_AsociadoId1",
                table: "conyuge");

            migrationBuilder.DropColumn(
                name: "AsociadoId1",
                table: "hijo");

            migrationBuilder.DropColumn(
                name: "AsociadoId2",
                table: "hijo");

            migrationBuilder.DropColumn(
                name: "AsociadoId1",
                table: "conyuge");

            migrationBuilder.DropColumn(
                name: "AsociadoId2",
                table: "conyuge");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AsociadoId1",
                table: "hijo",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AsociadoId2",
                table: "hijo",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AsociadoId1",
                table: "conyuge",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AsociadoId2",
                table: "conyuge",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_hijo_AsociadoId1",
                table: "hijo",
                column: "AsociadoId1");

            migrationBuilder.CreateIndex(
                name: "IX_conyuge_AsociadoId1",
                table: "conyuge",
                column: "AsociadoId1");

            migrationBuilder.AddForeignKey(
                name: "FK_conyuge_asociado_AsociadoId1",
                table: "conyuge",
                column: "AsociadoId1",
                principalTable: "asociado",
                principalColumn: "id_asociado",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_hijo_asociado_AsociadoId1",
                table: "hijo",
                column: "AsociadoId1",
                principalTable: "asociado",
                principalColumn: "id_asociado",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
