import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPermission } from './user-permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions: UserPermission[];
}
