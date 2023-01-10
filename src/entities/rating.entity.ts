import { Entity, PrimaryColumn } from "typeorm";

@Entity("rating")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
