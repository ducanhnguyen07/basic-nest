import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFeeToBook1719201641879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('books', new TableColumn({
            name: 'fee',
            type: 'decimal',
            default: 0,
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('books', 'fee');
    }

}
