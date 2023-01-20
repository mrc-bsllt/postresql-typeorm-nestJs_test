import { 
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"

@Entity()
export abstract class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true
  })
  email: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}