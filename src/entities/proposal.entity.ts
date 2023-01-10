import { Entity, PrimaryColumn } from "typeorm";

@Entity("proporsal")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
