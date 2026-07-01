import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'STUDENT' },
      { id: 2, name: 'TEACHER' },
      { id: 3, name: 'ADMIN' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Roles créés');

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

  console.log(
    `✅ Utilisateur de test créé : ${user.firstname} ${user.lastname}`,
  );

  // 3. Création de catégories de cours
  await prisma.category.createMany({
    data: [
      { name: 'Électricité' },
      { name: 'Plomberie' },
      { name: 'Menuiserie' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Catégories créées');

  // 4. Création d'un post de présentation du projet
  await prisma.post.create({
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

  // 5. Création de cours de test
  await prisma.course.createMany({
    data: [
      {
        name: "Initiation à l'électricité",
        description:
          "Apprenez les bases de l'électricité avec des projets pratiques.",
        content:
          "Ce cours vous guidera à travers les différentes notions de base de l'électricité, y compris les circuits électriques simples et la sécurité.",
        image:
          'https://plus.unsplash.com/premium_photo-1661911309991-cc81afcce97d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        level: 'Débutant',
        created_by: user.id,
      },
      {
        name: 'Plomberie pour débutants',
        description:
          'Les bases de la plomberie pour vous permettre de réparer vos installations vous-même.',
        content:
          'Ce cours couvre les outils essentiels, les tuyaux, les raccords, et les techniques de réparation courantes en plomberie.',
        image:
          'https://plus.unsplash.com/premium_photo-1664301972519-506636f0245d?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        level: 'Débutant',
        created_by: user.id,
      },
      {
        name: 'Menuiserie : Apprendre à travailler le bois',
        description:
          'Les bases de la menuiserie pour créer des meubles simples et solides.',
        content:
          'Ce cours vous apprendra à utiliser les outils de base pour couper, assembler et finir des pièces en bois.',
        image:
          'https://plus.unsplash.com/premium_photo-1664300494539-313eac2a6095?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        level: 'Débutant',
        created_by: user.id,
      },
      {
        name: "Initiation à l'outillage électroportatif",
        description:
          'Apprenez à utiliser en toute sécurité les outils électroportatifs essentiels.',
        content:
          "Ce cours vous initiera à l'utilisation correcte de la perceuse, de la ponceuse, de la scie sauteuse et d'autres outils indispensables pour vos projets de bricolage.",
        image:
          'https://plus.unsplash.com/premium_photo-1663040335693-1f10c8221d7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        level: 'Débutant',
        created_by: user.id,
      },
      {
        name: 'Peinture et décoration intérieure',
        description:
          'Techniques de base pour peindre et décorer vos espaces intérieurs.',
        content:
          'Ce cours vous enseignera à préparer les surfaces, choisir les bonnes peintures, et appliquer des finitions propres et durables.',
        image:
          'https://media.istockphoto.com/id/1358054371/fr/photo/des-s%C5%93urs-jumelles-heureuses-peignant-des-murs-tout-en-emm%C3%A9nageant-dans-leur-nouvel.jpg?s=2048x2048&w=is&k=20&c=vnjeAu-mgo72LB7PNW7ua7XW9g8IKXyKqk77hcksDy8=',
        level: 'Débutant',
        created_by: user.id,
      },
      {
        name: 'Apprendre la soudure pour débutants',
        description: 'Introduction aux techniques de base de la soudure.',
        content:
          "Ce cours couvre les principes de la soudure à l'arc, la sécurité, et les premières réalisations métalliques simples.",
        image:
          'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        level: 'Débutant',
        created_by: user.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Cours créés');
}

main()
  .catch((e: unknown) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
