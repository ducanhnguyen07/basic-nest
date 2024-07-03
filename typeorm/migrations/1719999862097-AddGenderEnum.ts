import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderEnum1719999862097 implements MigrationInterface {
    name = 'AddGenderEnum1719999862097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_gender_enum" RENAME TO "users_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" TYPE "public"."users_gender_enum" USING "gender"::"text"::"public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum_old" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" TYPE "public"."users_gender_enum_old" USING "gender"::"text"::"public"."users_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_gender_enum_old" RENAME TO "users_gender_enum"`);
    }

}
