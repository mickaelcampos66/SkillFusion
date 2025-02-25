# Routes

## Frontend

| URL              | Titre                 | Contenu                                                      | Description                    |
| ---------------- | --------------------- | ------------------------------------------------------------ | ------------------------------ |
| /                | Accueil               | Les cours/categories en vedette, présentation de SkillFusion | Page d'accueil                 |
| /login           | Connexion             | Formulaire de connexion                                      | Page de connexion              |
| /signup          | Inscription           | Formulaire d'inscription                                     | Page d'inscription             |
| /profile         | Profil                | Informations de l'utilisateur                                | Page de profil                 |
| /courses         | Cours                 | Liste des cours disponibles                                  | Page des cours                 |
| /courses/{id}    | Titre du cours        | Détails d'un cours                                           | Page d'un cours                |
| /categories      | Catégories            | Liste des catégories                                         | Page des catégories            |
| /categories/{id} | Titre de la categorie | Liste des cours d'une catégorie                              | Page des cours d'une catégorie |
| /forum           | Forum                 | Liste des sujets de discussion                               | Page du forum                  |
| /forum/{id}      | Sujet de discussion   | Liste des messages d'un sujet                                | Page d'un sujet de discussion  |
| /dashboard       | Dashboard             | Dashboard d'un instructeur/utilisateur, gestion de ses cours | Page du dashboard              |

## Backend

| URL                  | Method HTTP | Controller         | Methode | Données a renvoyer            |
| -------------------- | ----------- | ------------------ | ------- | ----------------------------- |
| /api/login           | POST        | AuthController     | login   | Token / User                  |
| /api/signup          | POST        | AuthController     | signup  | Token / User                  |
| /api/user/me         | GET         | UserController     | findOne | User                          |
| /api/user/{id}       | PUT         | UserController     | update  | User                          |
| /api/user/{id}       | DELETE      | UserController     | delete  | 200 or 204                    |
| /api/courses         | POST        | CourseController   | create  | Course                        |
| /api/courses         | GET         | CourseController   | findAll | Course[]                      |
| /api/courses/{id}    | GET         | CourseController   | findOne | Course                        |
| /api/courses/{id}    | PUT         | CourseController   | update  | Course                        |
| /api/courses/{id}    | DELETE      | CourseController   | delete  | 200 or 204                    |
| /api/categories      | GET         | CategoryController | findAll | Category[]                    |
| /api/categories/{id} | GET         | CategoryController | findOne | Category with related courses |
| /api/categories      | POST        | CategoryController | create  | Category                      |
| /api/categories      | PUT         | CategoryController | update  | Category                      |
| /api/categories/{id} | DELETE      | CategoryController | delete  | 200 or 204                    |
| /api/posts           | GET         | ForumController    | findAll | Post[]                        |
| /api/posts/{id}      | GET         | ForumController    | findOne | Post                          |
| /api/posts           | POST        | ForumController    | create  | Post                          |
| /api/posts/{id}      | PUT         | ForumController    | update  | Post                          |
| /api/posts/{id}      | DELETE      | ForumController    | delete  | 200 or 204                    |

## User Stories

| En tant que | Je veux pouvoir                     | Afin de                                                              |
| ----------- | ----------------------------------- | -------------------------------------------------------------------- |
| Visiteur    | Acceder a la page d'accuiel         | Decouvrir SkillFusion et des cours disponibles                       |
| Visiteur    | Visualiser des cours par categories | Choisir un cours qui m'interesse                                     |
| Visiteur    | Voir le detail d'un cours           | Suivre le  cours que j'ai choisi                                     |
| Visiteur    | Voir les posts du forum             | ---                                                                  |
| Visiteur    | Voir les mentions legales           | Savoir les conditions d'utilisation du site                          |
| Visiteur    | M'inscrire                          | D'avoir un compte apprenant ou instructeur                           |
| Visiteur    | Acceder au formulaire de contact    | Poser des questions ou faire des suggestions au proprietaire du site |
| Utilisateur | Me connecter                        | Acceder a d'autres fonctionnalités du site                           |
| Utilisateur | Voir mon profil                     | Modifier/supprimer mes informations                                  |
| Apprenant   | Acceder a mon dashboard             | Gerer mes favoris, voir mes cours suivis                             |
| Apprenant   | Poser une question sur le forum     | Avoir des reponses a mes questions                                   |
| Instructeur | Acceder a mon dashboard             | Gerer mes cours, ajouter, modifier ou supprimer                      |
| Instructeur | Interagir avec le forum             | Repondre aux questions des apprenants                                |
| Admin       | Gerer les utilisateurs              | CRUD                                                                 |
| Admin       | Gerer les cours                     | CRUD                                                                 |
| Admin       | Gerer les categories                | CRUD                                                                 |
| Admin       | Gerer les posts du forum            | CRUD                                                                 |
