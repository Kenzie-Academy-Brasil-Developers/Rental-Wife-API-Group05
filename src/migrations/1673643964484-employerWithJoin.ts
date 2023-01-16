import { MigrationInterface, QueryRunner } from "typeorm";

export class employerWithJoin1673643964484 implements MigrationInterface {
    name = 'employerWithJoin1673643964484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_employer" ADD CONSTRAINT "UQ_65f0cb54567ad8ed59a3bacb985" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "user_employer" ADD CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer" DROP CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985"`);
        await queryRunner.query(`ALTER TABLE "user_employer" DROP CONSTRAINT "UQ_65f0cb54567ad8ed59a3bacb985"`);
        await queryRunner.query(`ALTER TABLE "user_employer" DROP COLUMN "addressId"`);
    }

}
