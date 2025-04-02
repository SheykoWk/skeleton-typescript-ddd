import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { RoleEntity } from "./role.typeorm.entity";

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

  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToMany(() => RoleEntity, role => role.users, {cascade: true})
  @JoinTable()
  roles: RoleEntity[]
}