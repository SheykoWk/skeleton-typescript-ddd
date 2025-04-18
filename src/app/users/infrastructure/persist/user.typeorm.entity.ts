import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Role } from 'app/users/domain/enums/role.enum';

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string = '';

	@Column({ length: 100 })
	firstName: string = '';

	@Column({ length: 100 })
	lastName: string = '';

	@Column({ unique: true })
	email: string = '';

	@Column()
	password: string = '';

	@CreateDateColumn()
	createdAt?: Date = new Date();

	@UpdateDateColumn()
	updatedAt?: Date = new Date();

	@DeleteDateColumn()
	deletedAt?: Date;

	@Column({
		default: Role.USER,
	})
	role?: Role;
}
