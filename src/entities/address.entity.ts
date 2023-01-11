import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
