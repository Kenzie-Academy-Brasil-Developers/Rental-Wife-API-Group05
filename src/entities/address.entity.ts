import { Entity, PrimaryColumn } from "typeorm";

@Entity("address")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
