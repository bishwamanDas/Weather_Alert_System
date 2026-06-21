import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('tony@47', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'tony.AI47Labs@gmail.com' },
    update: {},
    create: {
      email: 'tony.AI47Labs@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'APPROVED',
    },
  });

  console.log('Seed: Admin user created', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
