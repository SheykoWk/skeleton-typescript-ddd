import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.typeorm.entity";

@Entity('role')
export class RoleEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({unique: true})
	name: string

	@ManyToMany(() => UserEntity, user => user.roles)
	users: UserEntity[]
}