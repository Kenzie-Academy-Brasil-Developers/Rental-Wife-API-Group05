import { Entity, PrimaryColumn } from "typeorm";

@Entity("service")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
