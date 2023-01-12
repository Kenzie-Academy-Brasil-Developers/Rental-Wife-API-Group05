import { MigrationInterface, QueryRunner } from "typeorm";

export class refactEntities1673469485711 implements MigrationInterface {
    name = 'refactEntities1673469485711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_hired" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "note" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_hired" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "employer_proposal_hired" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user_employer" DROP COLUMN "deletedAt"`);
    }

}
