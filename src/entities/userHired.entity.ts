import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Proposals } from "./proposal.entity";
import { Services } from "./services.entity";

@Entity("user_hired")
export class UserHired {
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

  @OneToMany(() => Proposals, (proposals) => proposals.hired)
  proposals: Proposals[];

  @ManyToMany(() => Services, (services) => services.usersHired)
  @JoinTable()
  services: Services[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword(): void {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
