import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';
import { UserPermission } from '../entities/user-permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepo: Repository<Permission>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(UserPermission)
    private userPermissionsRepo: Repository<UserPermission>,
  ) {}

  async addPermission(name: string): Promise<Permission> {
    const permission = this.permissionsRepo.create({ name });
    return this.permissionsRepo.save(permission);
  }

  async removePermission(id: number): Promise<void> {
    await this.permissionsRepo.delete(id);
  }

  async assignPermissionToUser(
    userId: number,
    permissionId: number,
  ): Promise<UserPermission> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    const permission = await this.permissionsRepo.findOne({
      where: { id: permissionId },
    });
    if (!user || !permission) throw new Error('User or Permission not found');

    const userPermission = this.userPermissionsRepo.create({
      user,
      permission,
    });
    return this.userPermissionsRepo.save(userPermission);
  }

  async removePermissionFromUser(
    userId: number,
    permissionId: number,
  ): Promise<void> {
    await this.userPermissionsRepo.delete({
      user: { id: userId },
      permission: { id: permissionId },
    });
  }

  async getUserPermissions(userId: number): Promise<Permission[]> {
    const userPermissions = await this.userPermissionsRepo.find({
      where: { user: { id: userId } },
      relations: ['permission'],
    });
    return userPermissions.map((up) => up.permission);
  }
}
