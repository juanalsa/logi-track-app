import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ MySQL Connected');
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error);
    process.exit(1);
  }
}

export { prisma };
