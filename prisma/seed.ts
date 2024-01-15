import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // seed basic customer grades
  const gradeA = await prisma.customerGrade.create({
    data: {
      grade: 'A',
    },
  });
  const gradeB = await prisma.customerGrade.create({
    data: {
      grade: 'B',
    },
  });
  const gradeC = await prisma.customerGrade.create({
    data: {
      grade: 'C',
    },
  });

  // seed basic order types
  const orderTypeOrder = await prisma.customerOrderType.create({
    data: {
      orderType: 'order',
    },
  });
  const orderTypeRefund = await prisma.customerOrderType.create({
    data: {
      orderType: 'refund',
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
