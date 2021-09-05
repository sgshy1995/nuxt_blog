import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1630839091755 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
          type: 'int',
          isNullable: false
        },
        {
          name: 'username',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'passwordDigest',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false,
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: false,
          default: 'now()'
        }
      ]
    }),true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
