import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPermission(@Body('name') name: string) {
    return this.permissionsService.addPermission(name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removePermission(@Param('id') id: number) {
    return this.permissionsService.removePermission(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users/:id/permissions/:permissionId')
  async assignPermissionToUser(
    @Param('id') userId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.permissionsService.assignPermissionToUser(userId, permissionId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users/:id/permissions/:permissionId')
  async removePermissionFromUser(
    @Param('id') userId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.permissionsService.removePermissionFromUser(
      userId,
      permissionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  async getUserPermissions(@Param('id') userId: number) {
    return this.permissionsService.getUserPermissions(userId);
  }
}
