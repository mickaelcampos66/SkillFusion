-- ============================================================
--  SkillFusion — seed complet PostgreSQL
--  Schéma : Role → User → Course → CourseCategory / Post → Comment
--           Category → CourseCategory
-- ============================================================

-- ── Supprimer dans l'ordre inverse des dépendances ──────────
DROP TABLE IF EXISTS "Comment"    CASCADE;
DROP TABLE IF EXISTS "Post"       CASCADE;
DROP TABLE IF EXISTS "CourseCategory" CASCADE;
DROP TABLE IF EXISTS "Course"    CASCADE;
DROP TABLE IF EXISTS "Category"  CASCADE;
DROP TABLE IF EXISTS "User"      CASCADE;
DROP TABLE IF EXISTS "Role"      CASCADE;

-- ── Rôles ──────────────────────────────────────────────────
CREATE TABLE "Role" (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO "Role" (name) VALUES
    ('admin'),
    ('user');

-- ── Utilisateurs ────────────────────────────────────────────
-- bcrypt fictif (hash de "Password123!" pour les tests) :
--   $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C
CREATE TABLE "User" (
    id           SERIAL PRIMARY KEY,
    firstname    VARCHAR(80)  NOT NULL,
    lastname     VARCHAR(80)  NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address      VARCHAR(255),
    role_id      INT          NOT NULL REFERENCES "Role"(id),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO "User" (firstname, lastname, email, password, phone_number, address, role_id) VALUES
    ('Sophie',    'Dupont',    'sophie.dupont@example.com',    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33612345678', '12 Rue des Lilas, 75011 Paris',        1),
    ('Thomas',    'Martin',    'thomas.martin@example.com',    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33623456789', '8 Avenue des Champs, 69001 Lyon',       1),
    ('Léa',       'Bernard',   'lea.bernard@example.com',      '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33634567890', '34 Rue de la Paix, 31000 Toulouse',     2),
    ('Antoine',   'Petit',     'antoine.petit@example.com',    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33645678901', '15 Boulevard Haussmann, 75008 Paris',    2),
    ('Camille',   'Moreau',    'camille.moreau@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33656789012', '7 Rue de la Liberté, 33000 Bordeaux',    2),
    ('Julien',    'Leroy',     'julien.leroy@example.com',    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33667890123', '22 Avenue Jean Jaurès, 13001 Marseille',  2),
    ('Emma',      'Durand',    'emma.durand@example.com',     '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33678901234', '3 Place Bellecour, 69002 Lyon',           2),
    ('Lucas',     'Dubois',    'lucas.dubois@example.com',    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33689012345', '19 Rue du Faubourg, 67000 Strasbourg',   2),
    ('Chloé',     'Fournier',  'chloe.fournier@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33690123456', '11 Rue des Arts, 44000 Nantes',           2),
    ('Maxime',    'Garcia',    'maxime.garcia@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGffrNuLFZNKVJCP.VCpb4wP.9.C', '+33701234567', '5 Avenue de la République, 59000 Lille', 2);

-- ── Catégories ──────────────────────────────────────────────
CREATE TABLE "Category" (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO "Category" (name) VALUES
    ('Plomberie'),
    ('Électricité'),
    ('Peinture'),
    ('Menuiserie'),
    ('Maçonnerie'),
    ('Jardinage'),
    ('Carrelage'),
    ('Isolation');

-- ── Cours ──────────────────────────────────────────────────
--  level : 'beginner' | 'intermediate' | 'advanced'
CREATE TABLE "Course" (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    content     TEXT,
    image       VARCHAR(500),
    level       VARCHAR(30)  NOT NULL,
    created_by  INT          NOT NULL REFERENCES "User"(id),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO "Course" (name, description, content, image, level, created_by) VALUES
    ('Initiation à la plomberie',
     'Apprenez les bases de la plomberie pour entretenir votre maison : détecter une fuite, remplacer un joint, débouchage de canalisation.',
     '# Lesbasesdelaplomberie\n\n## 1. Les outils indispensables\n- Clé à molette\n- Téflon et filasse\n- Coupe-tube\n- Pistolet à silicone\n\n## 2. Détecter une fuite\nUne fuite se repère souvent par des taches d''humidité sur les murs ou un compteur qui tourne sans consommation.\n\n## 3. Remplacer un joint\n1. Fermez lerobinet d''arrêt\n2. Dévissez l''écrou\n3. Retirez l''ancien joint\n4. Positionnez le nouveau joint\n5. Revissez en serrant modérément\n\n## 4. Débouchage de canalisation\n- Eau chaude + bicarbonate de soude\n- Ventouse\n- Furet professionnel',
     'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
     'beginner', 1),

    ('Installation électrique : les fondamentaux',
     'Découvez comment réaliser une installation électrique conformes aux normes françaises (NF C 15-100). Du tableau électrique aux prises, apprenez étape par étape.',
     '# Installationélectrique\n\n## Norme NF C 15-100\nLa norme française impose des règles strictes pour，保障la sécurité.\n\n## 1. Le tableau électrique\n- Composition : disjoncteurs, différentiels 30mA\n- Gaine technique logement (GTL)\n\n## 2. Les circuits\n- Eclairage : fil 1.5mm², disjoncteur 10A\n- Prises courantes : fil 2.5mm², disjoncteur 16A\n- Plaques de cuisson : fil 6mm², disjoncteur 32A\n\n## 3. Sécurité\n⚠️ Couper toujours le courant au tableau général avant toute intervention.',
     'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
     'intermediate', 1),

    ('Techniques de peinture intérieure',
     'Maîtrisez les techniques professionnelles de peinture pour un résultat impeccable : préparation des supports, choix des outils, application et finitions.',
     '# PeintureIntérieure\n\n## 1. Préparation du support\n- Lessivage et dégraissage\n- Rebouchage des trous (enduit de rebouchage)\n- Ponçage lightly with grain 120\n- Sous-couche si nécessaire\n\n## 2. Choisir sa peinture\n- Acrylique :less odor, dries fast\n- Glycérophtalique : plus couvrant, pièces humides\n\n## 3. Les outils\n- Rouleau microfibre (poil 10mm pour murs, 5mm pour plafonds)\n- Bâtonnets et grille essoreuse\n- Spatule et couteau de peintre\n- Bande de masquage\n\n## 4. Application\n1. Charger evenly le rouleau\n2. Appliquer en formant un W puis étaler\n3. Croiser les passes pour éviter les traces',
     'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
     'beginner', 2),

    ('Menuiserie : construire une étagère murale',
     'Fabrication complète d''une étagère murale en bois massif : conception, découpe, assemblage et fixation. Un projet idéal pour débuter en menuiserie.',
     '# ÉtagèreMurale\n\n## Matériaux nécessaires\n- Planche en chêne ou pin (120cm x 25cm x 2cm)\n- Chevilles et vis à bois\n- Niveau à bulle\n- Perceuse et mèche à bois\n- Scie circulaire ou scie sauteuse\n\n## Étapes de fabrication\n1. **Tracer et mesurer** — respectez les cotes avec un réglet\n2. **Découper** — utiliser une scie guide pour un coupe droite\n3. **Poncer** — grain 80 puis 120 puis 220\n4. **Assembler** — joints vissés ou lamellos\n5. **Fixer** — placer le niveau, percer, cheville, vis\n\n## Finitions\n- Vernis bois ou cire pour protégér\n- Temps de séchageminimum 24h',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
     'beginner', 3),

    ('Renover un mur : dalle et enduit',
     'Apprenez à rénover un mur dégradé : préparation du support, application d''un enduit de rebouchage et d''un enduit de lissage pour un rendu prêt à peindre.',
     '# RénovationdeMur\n\n## Diagnostic du support\n- Mur humide → traiter l''humidité avant toute chose\n- Fissures — évaluer leur importance\n- Anciennes peintures — gratter les parties non adhéées\n\n## Matériaux\n- Enduit de rebouchage (trous > 2mm)\n- Enduit de lissage (finitions)\n- Malaxeur et spatule large\n\n## Protocole\n1. Nettoyer le mur (brosse, chiffon humide)\n2. Appliquer l''enduit de rebouchage en couche thick\n3. Laisser sécher (según marque, 2-4h)\n4. Poncer légèrement (grain 120)\n5. Appliquer l''enduit de lissage en couche fine\n6. Poncer au grain 220 pour un finishing parfait',
     'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
     'intermediate', 3),

    ('Aménagement de jardin : créer une terrasse',
     'Guide complet pour aménagerager une terrasse en bois ou en carrelage : préparation du terrain, choix des matériaux, mise en oeuvre et finitions.',
     '# TerrassedeJardin\n\n## 1. Conception\n- Mesurer la surface et dessiner un plan\n- Choisir le matériau : bois ( plots adjustables) ou carrelage grès cérame\n- Vérifier la pente de drainage (1 à 2 cm par mètre)\n\n## 2. Préparation du terrain\n- Décaper le gazon sur 15-20cm\n- Poser un géotextile pour éviter les mauvaises herbes\n- Mettre en place un lit de gravats compacté\n\n## 3. Structure (bois)\n- Poser les lambourdes sur plots PVC\n- Utiliser des vis INOX pour éviter la corrosion\n- Poser les lames en laissant 5mm de jeu entre chaque\n\n## 4. Finitions\n- Frises de rive\n- Traitement du bois las años 1-2',
     'https://images.unsplash.com/photo-1591825729269-caeb5f2982a7?w=800',
     'intermediate', 4),

    ('Pose de carrelage : du sol aux murs',
     'Techniques professionnelles de pose de carrelage : préparation du support, organisation du calepinage, collage, jointoiement et démoulage.',
     '# PoseCarrelage\n\n## 1. Préparation\n- Vérifier la planarité du support (max 5mm sous la règle de 2m)\n- Appliquer un primaire d''accrochage si nécessaire\n- Faire le calepinage : dessiner la disposition pour minimiser les coupes\n\n## 2. Collage\n- Utiliser une spatule crantée (crans de 6 à 10mm selon le format)\n- Appliquer le mortier-colle en double-encollage pour les dalles > 60x60\n- Ne pas appliquer sur plus de 1m² à la fois\n\n## 3. Pose\n- Commencer par le centre et progresser vers les bords\n- Utiliser des croisillons (2mm pour joints细细, 3-5mm standard)\n- Vérifier l''alignement au fur et à mesure\n\n## 4. Jointoiement\n- Attendre 24h minimum après le collage\n- Appliquer le mortier de jointoiement avec une raclette en caoutchouc\n- Nettoyer l''excédent avec une éponge humide',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
     'advanced', 5),

    ('Isolation thermique : laine de verre et laine de roche',
     'Améliorez le performance énergétique de votre habitat grâce à une isolation efficace : selection des matériaux, techniques de pose en murs, combles et sols.',
     '# IsolationThermique\n\n## Pourquoi isoler ?\n- Réduction de 30 à 60% de la facture énergétique\n- Confort été comme hiver\n- Valorisation du bien immobilier\n\n## Matériaux\n- **Laine de verre** : rapport qualité/prix excellent, R=2.5 à 7.7\n- **Laine de roche** : meilleure résistance à l''humidité\n- **Ouate de cellulose** : option écologique\n\n## Isolation des murs par l''intérieur\n1. Poser une membrane pare-vapeur sur l''ossature\n2. Glisser les rouleaux ou panneaux entre les montants\n3. Compléter avec un freine-vapeur\n4. Visser des plaques de plâtre BA13\n\n## Isolation des combles perdus\n- Soufflage de ouate de cellulose ou laine à souffler\n- Épaisseur minimum 30cm pour R≥7\n\n## Points de vigilance\n⚠️ Étanchéité à l''air aussi importante que l''isolation\n⚠️ Traiter les ponts thermiques',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
     'intermediate', 5),

    ('Finitions et polishage des surfaces bois',
     'Les dernières étapes pour sublimer vos créations en bois : ponçage progressif, bouchonnage, application de teinte, vernis et cire. Conseils de pro pour un rendu irréprochable.',
     '# FinitionsBois\n\n## 1. Ponçage progressif\n- Commencer au grain 80 (dégrossissage)\n- Poursuivre au grain 120\n- Terminer au grain 180 ou 220 pour les bois clairs\n- Éliminer toute poussière avant teinte\n\n## 2. Teinte\n- Aplicador con pincel dans le sens du grain\n- Laisser pénétrer 5-15 minutes\n- Essuyer l''excédent avec un chiffon non pelucheux\n- Laisser sécher 24h\n\n## 3. Finition\n| Type      | Usage               | Séchage  |
|-----------|---------------------|----------|
| Vernis    | zones humides       | 8-12h/couche |
| Huile     | plan de travail     | 24h      |
| Cire      | mobilER, Dekoration | 4-6h     |\n\n## 4. Polishage final\n- Light ponçage entre couches au grain 320\n- Appliquer 2 à 3 couches pour un rendu profond',
     'https://images.unsplash.com/photo-1504328345606-18bbc9091d23?w=800',
     'advanced', 6),

    ('Diagnostic et réparation électrique',
     'Apprenez à diagnostiquer les pannes électriques courantes et à effectuer les réparations dans le respect des normes de sécurité.',
     '# DiagnosticÉlectrique\n\n## Outillage\n- Multimètre digital\n- Testeur de tension (sans contact)\n- Pince ampèremétrique\n- Gants isolants classe 0\n\n## Pannes courantes\n### 1. Disjoncteur qui saute\n- Déclenchement thermique → surcharge\n- Déclenchement magnétique → court-circuit\n- Vérifier chacun des appareils branchés\n\n### 2. Prise qui ne fonctionne plus\n1. Vérifier le disjoncteur correspondant\n2. Tester la prise avec un multimètre (220V attendue)\n3. Inspecter le câblage de la boîte d''encastrement\n4. Vérifier les connexions vissées\n\n### 3. Luminaire qui clignote\n- Causes fréquentes : mauvais contact, ampoule mal vissée\n- Vérifier la douille et les connexions\n\n## Sécurité\n⚠️ Toujours couper le courant au tableau avant intervention\n⚠️ Utiliser un multimètre avant de toucher tout conducteur',
     'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
     'advanced', 7),

    ('Montage de meubles : techniques avancées',
     'Maîtrisez l''assemblage de meubles complexes : techniques de joints, systèmes de fixation invisibles, ajustements et personnalisation de meubles modulaires.',
     '# MontageAvancé\n\n## 1. Joints structurels\n- **Domino/Lamello** : assemblages robustes et esthétiques\n- **Queues droites** : classique et résistant\n- **Tenon et mortaise** : pour les assemblages courbes\n\n## 2. Quincaillerie moderne\n- Taquets et vérins pour rayonnage\n- Compenses pour ajustement vertical\n- Équerres invisibles à visser dans la masse\n- Connecteurs minifix pour démontage simple\n\n## 3. Ajustement et personnalisation\n- Reprise des cotes sur mesure\n- Ajustement des portes et tiroirs (charnières à rattrapage)\n- Ajout d''éclairages LED encastrés\n- Peinture ou vernissage post-montage\n\n## 4. Erreurs fréquentes à éviter\n- Ne pas serrer les vis à fond avant vérification de l''alignement\n- Percer les avant-trous pour éviter les fentes\n- Vérifier le carré des angles avant fixation finale',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
     'intermediate', 8),

    ('Sécurité sur chantier : les bonnes pratiques',
     'Formation essentielle pour tout bricoleur ambitieux : EPI, risque électrique, manutention, travail en hauteur et gestion des déchets de chantier.',
     '# SécuritéChantier\n\n## Équipements de Protection Individuelle (EPI)\n- Casque CE (chute d''objets)\n- Lunettes de protection (projection de particules)\n- Gants adaptés (coupure, produits chimiques)\n- Chaussures de sécurité S3\n- Protection auditive si niveau > 80dB\n\n## Risque électrique\n- Habilitation BR (bas voltage) ou B1V pour interventions\n- Vérification systématique de l''absence de tension (VAT)\n- Délimitation de la zone de travail\n\n## Manutention\n- Charge max recommendation : 25kg homme / 55kg équipe\n- Utiliser les jambes, pas le dos\n- Demander de l''aide pour les charges lourdes ou volumineuses\n\n## Travail en hauteur\n- Échelle : max 2m de hauteur utile\n- Escabeau : surface stable et non conductrice\n- Échafaudage roulant : vérification avant chaque utilisation\n- Garde-corps obligatoires à partir de 3m\n\n## Gestion des déchets\n- Tri sélectif : bois, métaux, plastics, gravats\n- Location de benne selon volume\n- Dépôt en déchetterie pour produits spéciaux (peintures, solvants)',
     'https://images.unsplash.com/photo-1581092918056-0c4b3e5b7e93?w=800',
     'beginner', 9);

-- ── Cours × Catégories ─────────────────────────────────────
CREATE TABLE "CourseCategory" (
    id          SERIAL PRIMARY KEY,
    course_id   INT NOT NULL REFERENCES "Course"(id),
    category_id INT NOT NULL REFERENCES "Category"(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_course_category UNIQUE (course_id, category_id)
);
INSERT INTO "CourseCategory" (course_id, category_id) VALUES
    (1, 1),   -- Initiation à la plomberie → Plomberie
    (2, 2),   -- Installation électrique → Électricité
    (3, 3),   -- Peinture → Peinture
    (4, 4),   -- Menuiserie étagère → Menuiserie
    (5, 5),   -- Rénover un mur → Maçonnerie
    (6, 6),   -- Terrasse jardin → Jardinage
    (6, 4),   -- Terrasse jardin → Menuiserie (第二大类别)
    (7, 7),   -- Carrelage → Carrelage
    (7, 5),   -- Carrelage → Maçonnerie
    (8, 8),   -- Isolation → Isolation
    (9, 4),   -- Finitions bois → Menuiserie
    (10, 2),  -- Diagnostic électrique → Électricité
    (11, 4),  -- Montage meubles → Menuiserie
    (12, 5);  -- Sécurité chantier → Maçonnerie

-- ── Publications du forum ───────────────────────────────────
CREATE TABLE "Post" (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    content     TEXT NOT NULL,
    user_id     INT  NOT NULL REFERENCES "User"(id),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO "Post" (title, content, user_id) VALUES
    ('Comment débouchrer une canalisation sans produits chimiques ?',
     'Ma cuisine sente mauvais et l''évier drain lentement. J''ai entendu parler du bicarbonate + vinaigre blanc mais ça ne marche pas sur ma grosse obstruction. Des conseils ? J''ai peur d''utiliser des produits caustiques qui abîmeraient mes tuyaux PVC.',
     3),

    ('Quelle peinture pour une salle de bain ?',
     'Je vais repeindre ma salle de bain qui a des traces d''humidité. Faut-il une peinture spécial pièce humide ou une glycéro standard suffit ? Y a-t-il un sous-enduit à prévoir avant ?',
     4),

    ('Mon disjoncteur saute quand je mets le four en marche',
     'Depuis quelques jours, dès que je lance mon four (même à 180°C), le disjoncteur 20A correspondant sauté. Les autres appareils sur le même circuit fonctionnent. Le four a 5 ans. Est-ce que c''est le disjoncteur fatigué ou le four qui présente un défaut ?',
     5),

    ('Réaliser une terrasse en bois ou en carrelage pour 30m² ?',
     'Je hésite entre une terrasse bois sur plots et une terrasse carrelage grès cérame. Budget ~2500€. Mon terrain est légèrement en pente (5cm sur 5m). La thérapeuthte bois me plaît mais j''ai peur de l''entretien. Qui a une expérience sur le long terme ?',
     6),

    ('Comment jointoyer un carrelage murals sans laisser de traces blanches ?',
     'J''ai carrelé mon crédence de cuisine et au jointoiement, il me reste un dépôt blanchâtre impossible à nettoyer. J''ai pourtant bien rincé mon éponge. Est-ce que c''est un problème de mortier ? Comment rattraper ça sans tout casser ?',
     7),

    ('Isolation des murs par l''intérieur : par où commencer ?',
     'Maison des années 80, murs non isolés. Je veux gainer ~120m² murs. J''hésite entre laine de verre et laine de roche. Faut-il enlever l''ancienne tapisserie d''abord ? Comment gérer les prises et interrupteurs ?',
     8),

    ('Prix pour une renovation complète de salle de bain ?',
     'Je prévois de refaire entièrement ma salle de bain (6m²) : déplacement de la douche, nouveau carrelage sol et murs, éclairage, meuble vasque. Je suis à Paris. Quel ordre de budget dois-je prévoir ? Artisan ou auto-rénovation ?',
     9),

    ('Créer une jardinière en bois : quelle essence choisir ?',
     'Je veux fabriquer des jardinières pour mon balcon (6 m²). Quelle essence de bois est recommandée pour un contact permanent avec la terre humide ? Je hésite entre chêne, robinier et Douglas. Le robinier me semble bien mais je ne connais pas.',
     10),

    ('Différence entre disjoncteur différentiel et disjoncteur divisionnaire ?',
     'Je configure mon tableau électrique et je ne comprends pas la différence entre un disjoncteur différentiel 30mA et un disjoncteur divisionnaire обычный. Quand utilise-t-on l''un ou l''autre ?',
     3),

    ('Outils pour debuter en menuiserie sans se ruiner ?',
     'Je debute en menuiserie, surtout pour des petits projets (étagères, рамки). Quel budget outils minimum ? Scie circulaire ou sauteuse ? Quel rabot électrique pas trop cher ? Je ne veux pas investir 1000€ d''emblée.',
     4);

-- ── Commentaires ────────────────────────────────────────────
CREATE TABLE "Comment" (
    id          SERIAL PRIMARY KEY,
    content     TEXT NOT NULL,
    user_id     INT  NOT NULL REFERENCES "User"(id),
    post_id     INT  NOT NULL REFERENCES "Post"(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO "Comment" (content, user_id, post_id) VALUES
    ('Pour une vraie obstruction, le furet électrique est ta meilleure option. Location en négoce matériaux pour ~15€/jour. Ça coûte rien et ça désintègre tout.', 5, 1),
    ('+1 pour le furet ! J''ai débouché mon évier de cuisine en 10 minutes après des semaines de galère avec le bicarbonate. Vérifie que le tuyau n''est pas affaissé aussi.', 6, 1),
    ('Eventuellement un nettoyeur haute pression pour les canalisations extérieures, mais c''est overkill pour une cuisine.', 7, 1),
    ('La peinture spécial pièce humide est obligatoire en zone de projection directe (douche). elsewhere une glycéro classique fait l''affaire. Chez Levis ou Ripolin.', 8, 2),
    ('Pense aussi à appliqué une sous-couche anti-humidité tipo sous-couche spécial pièces humides. Ça prépare le support et ça bloque les remontées.', 1, 2),
    ('Un disjoncteur qui saute à 180°C = courant de fuite ou résistance de sole qui lâche. Teste avec un multimètre (référence : 20-30Ω pour une résistance de four).', 2, 3),
    ('Si le disjoncteur est ancien (>20 ans), il a peut-être perdu en pouvoir de coupure. Le remplacer coûte 10-15€ mais fait appel à un électricien car le tableau = zona non面相.', 1, 3),
    ('Terrasse bois = entretiens刷 todos los años (démoussage, lasure). Terrasse carrelage = presque sans entretien. Personnellement j''ai choisi le carrelage et je ne regrette pas.', 9, 4),
    ('La pente de 5cm/5m est nickeline pour le carrelage. En bois, les plots automatically compensate. Prévoyez un drainage si la terrasse est贴近 la maison.', 10, 4),
    ('Contactez minimum 3 artisans pour avere un budget réel. À Paris, comptez 1500-2500€材料和 pose pour 6m² refaits complets. Auto-renovation = economie 30-40% mais attention au délai.', 5, 5),
    ('Le dépôt blanc = voile de ciment. Attendrisseur de voile de ciment en spray (类型 HG ou Soluvacid). Applique, laisse agir 5 min, rince. Ça évite de tout reapprendre.', 6, 6),
    ('Laine de roche mieux pour les murs grâce à sa meilleure résistance à la compression et à l''humidité. Épaisseur mini 100mm pour être au 标准 RT 2020.', 7, 7),
    ('Pour les prises : caja saillie special isolation ou alors crear une boite dans l''épaisseur de l''isolant. C''est le point delicat le plus fréquent.', 8, 7),
    ('Le robinier est top pour les jardinières (naturellement罗塘耐腐). Le chêne tiens aussi mais moins longtemps au contact permanent du sol. Évite le Douglas non traité.', 9, 8),
    ('Traitement autoclave obligatoire pour le robinier si tu le veux罗塘耐腐. Le robinier brut a une résistance naturelle mais c''est mieux avec. Prix : ~25€/m pour du robinier.', 10, 8),
    ('Le disjoncteur différentiel 30mA est obligatoire en tête de chaque circuit (norme NF C 15-100). Le divisionnaire biasa protège le circuit. En résumé : différentiel = sécurité personnes, divisionnaire = sécurité matériels.', 1, 9),
    ('En pratique, tu mets un DDR (différentiel) 30mA en tête de circuit, puis des disjoncteurs divisionnaires de 10A/16A/20A en aval selon les Circuits. Tous différents roles.', 2, 9),
    ('Pour debuter : scie sauteuse + perceuse-visseuse = 80% des besoins. Pas besoin de scie circulaire pour des planches. Un rabot électrique (~80€) est très utile aussi.', 3, 10),
    ('Prends une perceuse à colonne pour faire des avant-trous précis, ça évite énormément de mistakes. Et investis dans des serre-joints (lot de 6-8) avant tout.', 4, 10),
    ('J''ai debute avec un kit scie sauteuse + défonceuse à 150€ total en promotion. Les serre-joints sont effectivement le meilleur investissement au debut.', 5, 10);

-- ── Réinitialiser les séquences pour les prochain inserts ────
SELECT setval('"Role_id_seq"',         (SELECT MAX(id) FROM "Role"),         true);
SELECT setval('"User_id_seq"',         (SELECT MAX(id) FROM "User"),         true);
SELECT setval('"Category_id_seq"',     (SELECT MAX(id) FROM "Category"),     true);
SELECT setval('"Course_id_seq"',       (SELECT MAX(id) FROM "Course"),       true);
SELECT setval('"CourseCategory_id_seq"',(SELECT MAX(id) FROM "CourseCategory"), true);
SELECT setval('"Post_id_seq"',         (SELECT MAX(id) FROM "Post"),         true);
SELECT setval('"Comment_id_seq"',      (SELECT MAX(id) FROM "Comment"),      true);
