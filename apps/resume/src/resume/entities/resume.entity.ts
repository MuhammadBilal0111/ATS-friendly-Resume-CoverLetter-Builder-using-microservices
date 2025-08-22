// import { User } from 'apps/users/src/user.entity';
import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class PersonalInfo {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column()
  portfolio: string;
}

class Education {
  @Column()
  school: string;

  @Column()
  degree: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  gpa: string;
}

class Experience {
  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column('array')
  points: string[];
}

class Project {
  @Column()
  name: string;

  @Column()
  technologies: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  liveLink?: string;

  @Column('array')
  points: string[];
}

class Skill {
  @Column()
  name: string;

  @Column()
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

class Certification {
  @Column()
  name: string;

  @Column()
  issuingBody: string;

  @Column()
  date: string;

  @Column()
  link: string;
}

class Template {
  @Column()
  id: string;

  @Column()
  headingColor: string;
}

@Entity()
export class Resume {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    type: 'int',
    nullable: false,
  })
  userId!: number;
  // This is a TypeORM embedded column.
  // Hey! Inside this entity (like Resume), I want to include another object called personalInfo, and it should behave like part of this entity in the database.

  @Column(() => PersonalInfo) // this syntax is used for embedded object i.e. object within object
  personalInfo: PersonalInfo;

  @Column()
  education: Education[];

  @Column()
  summary: string;

  @Column()
  experience: Experience[];

  @Column()
  projects: Project[];

  @Column()
  skills: Skill[];

  @Column()
  certifications: Certification[];

  @Column(() => Template)
  template: Template;

  // @ManyToOne(() => User, (user) => user.resume, {
  //   onDelete: 'CASCADE', // when user deleted all its resume will be deleted
  // })
  // user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
