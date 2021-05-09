import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1620570987406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "payer_id",
            type: "uuid",
          },
          {
            name: "payee_id",
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
            name: "User",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["payer_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "User",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["payee_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
