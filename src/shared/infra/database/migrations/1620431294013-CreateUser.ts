import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1619742722251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "full_name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "cpf",
            type: "varchar",
            isNullable: true,
            isUnique: true,
          },
          {
            name: "cnpj",
            type: "varchar",
            isNullable: true,
            isUnique: true,
          },
          {
            name: "is_shopkeeper",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
