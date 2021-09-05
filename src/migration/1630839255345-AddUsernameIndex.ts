import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class AddUsernameIndex1630839255345 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('users', new TableIndex({
      name: 'usernameIndex',
      columnNames: ['username'],
      isUnique: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'usernameIndex');
  }

}
