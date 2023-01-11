import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("rating")
export class Rating {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  recomendation: string;

  @Column()
  note: Number;
}
