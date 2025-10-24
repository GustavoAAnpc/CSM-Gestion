using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSM_Gestion.Backend.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "asociado",
                columns: table => new
                {
                    id_asociado = table.Column<Guid>(type: "uuid", nullable: false),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    apellido_paterno = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    apellido_materno = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    fecha_nacimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    genero = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    dni = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: false),
                    departamento = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    provincia = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    distrito = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    direccion = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    base_zonal = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    numero_celular = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    correo_actual = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ocupacion = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    nacionalidad = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    estado_civil = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    grado_instruccion = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    libreta_militar = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    numero_ruc = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    foto_asociado = table.Column<string>(type: "text", nullable: true),
                    foto_voucher = table.Column<string>(type: "text", nullable: true),
                    foto_firma = table.Column<string>(type: "text", nullable: true),
                    fecha_registro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    estado = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    fecha_aprobado = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_asociado", x => x.id_asociado);
                });

            migrationBuilder.CreateTable(
                name: "conyuge",
                columns: table => new
                {
                    id_conyuge = table.Column<Guid>(type: "uuid", nullable: false),
                    id_asociado = table.Column<Guid>(type: "uuid", nullable: false),
                    AsociadoId1 = table.Column<Guid>(type: "uuid", nullable: false),
                    nombre = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    apellido_paterno = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    apellido_materno = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    dni = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: true),
                    fecha_nacimiento = table.Column<DateOnly>(type: "date", nullable: true),
                    grado_estudios = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AsociadoId2 = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_conyuge", x => x.id_conyuge);
                    table.ForeignKey(
                        name: "FK_conyuge_asociado_AsociadoId1",
                        column: x => x.AsociadoId1,
                        principalTable: "asociado",
                        principalColumn: "id_asociado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_conyuge_asociado_id_asociado",
                        column: x => x.id_asociado,
                        principalTable: "asociado",
                        principalColumn: "id_asociado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hijo",
                columns: table => new
                {
                    id_hijo = table.Column<Guid>(type: "uuid", nullable: false),
                    id_asociado = table.Column<Guid>(type: "uuid", nullable: false),
                    AsociadoId1 = table.Column<Guid>(type: "uuid", nullable: false),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    dni = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: true),
                    genero = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    fecha_nacimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    grado_estudios = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AsociadoId2 = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hijo", x => x.id_hijo);
                    table.ForeignKey(
                        name: "FK_hijo_asociado_AsociadoId1",
                        column: x => x.AsociadoId1,
                        principalTable: "asociado",
                        principalColumn: "id_asociado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_hijo_asociado_id_asociado",
                        column: x => x.id_asociado,
                        principalTable: "asociado",
                        principalColumn: "id_asociado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_conyuge_AsociadoId1",
                table: "conyuge",
                column: "AsociadoId1");

            migrationBuilder.CreateIndex(
                name: "IX_conyuge_id_asociado",
                table: "conyuge",
                column: "id_asociado",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_hijo_AsociadoId1",
                table: "hijo",
                column: "AsociadoId1");

            migrationBuilder.CreateIndex(
                name: "IX_hijo_id_asociado",
                table: "hijo",
                column: "id_asociado");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "conyuge");

            migrationBuilder.DropTable(
                name: "hijo");

            migrationBuilder.DropTable(
                name: "asociado");
        }
    }
}
