import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string = '';

  @Column({ length: 100 })
  firstName: string = '';

  @Column({ length: 100 })
  lastName: string = '';

  @Column({ unique: true })
  email: string= '';

  @Column()
  password: string  = '';

  @CreateDateColumn()
  createdAt?: Date =new Date()

  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}