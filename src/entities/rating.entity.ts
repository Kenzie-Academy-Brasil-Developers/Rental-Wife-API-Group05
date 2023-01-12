import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rating")
export class Rating {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  recomendation: string;

  @Column()
  note: Number;
}
