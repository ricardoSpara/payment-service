import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1620489721467 implements MigrationInterface {
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
            name: "type",
            type: "varchar",
          },
          {
            name: "wallet_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "Wallet",
            referencedTableName: "wallets",
            referencedColumnNames: ["id"],
            columnNames: ["wallet_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
