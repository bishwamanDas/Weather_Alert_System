import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.user.findMany().then(console.log).finally(() => p.$disconnect());
