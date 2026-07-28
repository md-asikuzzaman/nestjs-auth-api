import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  blockUser(id: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { isBlocked: true },
    });
  }

  unblockUser(id: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { isBlocked: false },
    });
  }
}
