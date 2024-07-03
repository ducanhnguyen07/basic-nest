import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1719995423522 implements MigrationInterface {
    name = 'CreateTable1719995423522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "fee" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("bookId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d9a50cf413c85590b65860eeee4" PRIMARY KEY ("bookId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_607ba9087b85b06edda8832031" ON "invoices" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fcbe490dc37a1abf68f19c5ccb" ON "invoices" ("userId") `);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_607ba9087b85b06edda88320317" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_fcbe490dc37a1abf68f19c5ccb9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_fcbe490dc37a1abf68f19c5ccb9"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_607ba9087b85b06edda88320317"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcbe490dc37a1abf68f19c5ccb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_607ba9087b85b06edda8832031"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
