import { Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
