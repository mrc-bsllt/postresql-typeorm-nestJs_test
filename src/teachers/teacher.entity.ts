import { 
  Entity,
  Column,
  ManyToOne
} from "typeorm"
import { Person } from "src/utils/person.entity"
import { Exclude } from "class-transformer"
import { School } from "src/schools/scholl.entity"

@Entity()
export class Teacher extends Person {
  @Exclude()
  @Column({
    unique: true
  })
  phone: string;

  @Column()
  subject: string;

  @ManyToOne(
    () => School,
    (school) => school.teachers,
    {
      nullable: false
    }
  )
  school: School;
}