import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Proposals } from "./proposal.entity";
import { Address } from "./address.entity";

@Entity("user_employer")
export class UserEmployer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_hired: boolean;

    @Column()
    avatar_img: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    location: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => Proposals, (proposals) => proposals.employer)
    proposals: Proposals[];

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
