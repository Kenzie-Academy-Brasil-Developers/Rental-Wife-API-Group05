import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdminEntity1673632126695 implements MigrationInterface {
    name = 'createAdminEntity1673632126695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" RENAME COLUMN "recomendation" TO "recommendation"`);
        await queryRunner.query(`CREATE TABLE "user_admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_c143511e72fac735b8006051e55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_employer" DROP CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985"`);
        await queryRunner.query(`ALTER TABLE "user_hired" DROP CONSTRAINT "FK_8cad5d8c19d83e5f6997272c2cc"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" DROP CONSTRAINT "FK_26052233e9db13f4c8267909444"`);
        await queryRunner.query(`ALTER TABLE "rating" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_employer" ADD CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_hired" ADD CONSTRAINT "FK_8cad5d8c19d83e5f6997272c2cc" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" ADD CONSTRAINT "FK_26052233e9db13f4c8267909444" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" DROP CONSTRAINT "FK_26052233e9db13f4c8267909444"`);
        await queryRunner.query(`ALTER TABLE "user_hired" DROP CONSTRAINT "FK_8cad5d8c19d83e5f6997272c2cc"`);
        await queryRunner.query(`ALTER TABLE "user_employer" DROP CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985"`);
        await queryRunner.query(`ALTER TABLE "rating" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" ADD CONSTRAINT "FK_26052233e9db13f4c8267909444" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_hired" ADD CONSTRAINT "FK_8cad5d8c19d83e5f6997272c2cc" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_employer" ADD CONSTRAINT "FK_65f0cb54567ad8ed59a3bacb985" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "user_admin"`);
        await queryRunner.query(`ALTER TABLE "rating" RENAME COLUMN "recommendation" TO "recomendation"`);
    }

}
