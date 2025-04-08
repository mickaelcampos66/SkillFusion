import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { id: 1, name: 'USER' },
      { id: 2, name: 'ADMIN' },
      { id: 3, name: 'MANAGER' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Roles créés');

  // 2. Création d'un utilisateur de test
  const hashedPassword = await bcrypt.hash('MegaMdp', 10);
  const user = await prisma.user.upsert({
    where: { email: 'john.doe@skillfusion.fr' },
    update: {},
    create: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@skillfusion.fr',
      password: hashedPassword,
      role_id: 1, // USER
      phone_number: '0612345678',
      address: '123 Rue du Bricolage, Paris',
    },
  });

  console.log(`✅ Utilisateur de test créé : ${user.firstname} ${user.lastname}`);

  // 3. Création de catégories de cours
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Électricité' },
      { name: 'Plomberie' },
      { name: 'Menuiserie' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Catégories créées');

  // 4. Création d'un post de présentation du projet
  const post = await prisma.post.create({
    data: {
      title: 'Présentation du projet SkillFusion',
      content: `
SkillFusion est une plateforme éducative dédiée à l'apprentissage du bricolage et au Do It Yourself (DIY).

Notre objectif est de rendre le bricolage accessible à tous, à distance, grâce à des cours, des tutoriels, et une communauté engagée.

👷 Pour qui ?
- Amateurs de bricolage
- Professionnels du bâtiment
- Propriétaires et locataires
- Apprentis bricoleurs

📅 Organisation en méthode agile, avec des équipes formées selon les souhaits exprimés via un formulaire de voeux.
      `,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: user.id,
    },
  });

  console.log('✅ Post de présentation du projet ajouté');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
