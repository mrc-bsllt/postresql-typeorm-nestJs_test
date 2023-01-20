import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,  
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm"
import { Teacher } from "src/teachers/teacher.entity"

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  @Column()
  municipality: string;

  @Column()
  province: string;

  @Column({
    unique: true
  })
  address: string;

  @OneToMany(
    () => Teacher,
    (teachers) => teachers.school
  )
  teachers: Teacher[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}