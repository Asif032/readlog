import prisma from "../../prisma/client";

export const UserRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findAll: () => prisma.user.findMany(),
  create: (data: any) => prisma.user.create({ data }),
}