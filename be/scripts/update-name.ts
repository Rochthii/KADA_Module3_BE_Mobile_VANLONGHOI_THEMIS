import { prisma } from '../src/lib/prisma';

async function main() {
  const updatedProfiles = await prisma.profile.updateMany({
    where: {
      email: { in: ['rochth2006@gmail.com', 'rochthi2006@gmail.com', 'rochthi59@gmail.com'] },
    },
    data: {
      fullName: 'Chăm Rốch Thi',
    },
  });
  console.log('Updated profiles:', updatedProfiles);

  const updatedOrgs = await prisma.organization.updateMany({
    where: {
      legalRepresentative: { contains: 'Lan Anh' },
    },
    data: {
      legalRepresentative: 'Chăm Rốch Thi',
    },
  });
  console.log('Updated organizations:', updatedOrgs);
}

main().catch(console.error).finally(() => prisma.$disconnect());
