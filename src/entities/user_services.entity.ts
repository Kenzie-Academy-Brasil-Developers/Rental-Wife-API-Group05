import { Entity, PrimaryColumn } from "typeorm";

@Entity("user_service")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
}
