import { Entity } from "typeorm"
import { Person } from "src/utils/person.entity"

@Entity()
export class Student extends Person {}