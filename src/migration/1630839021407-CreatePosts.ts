import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePosts1630839021407 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
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
          name: 'title',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'content',
          type: 'text',
          isNullable: false
        },
        {
          name: 'authorId',
          type: 'int',
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
    await queryRunner.dropTable('posts');
  }

}
