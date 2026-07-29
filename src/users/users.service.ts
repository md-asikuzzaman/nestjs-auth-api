import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /** Get user by ID */
  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  /** Block user by ID */
  blockUser(id: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { isBlocked: true },
    });
  }

  /** Unblock user by ID */
  unblockUser(id: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { isBlocked: false },
    });
  }

  /** Update user by ID */
  updateUser(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: dto,
    });
  }

  /** Change user password by ID */
  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      dto.oldPassword,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Old password is incorrect');
    }

    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException(
        'New password must be different from the old password',
      );
    }

    return this.prisma.user.update({
      where: { id: id },
      data: { hashedPassword: dto.newPassword, hashed_refresh_token: null },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });
  }
}
