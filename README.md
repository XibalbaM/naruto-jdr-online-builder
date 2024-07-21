# naruto-jdr-online-builder

Regex pour ajouter les .js aux imports :(\bfrom\s+["']\.(?:(?!\.js).)*)(["']) -> $1.js$2

## Structure
- ### Back
Contient un app Express qui sert l'API.
- ### Front
Contient le front-end, fait en Angular avec TailwindCSS.
- ### Bot
Contient la base du bot discord, a peine commencé. Pas du tout prioritaire, se concentrer sur l'App en ligne et l'API
- ### Roll20
On y mettra le mod roll20 si on le fait, pour le moment ce n'est qu'une idée pas développée.

## Environment
Pour la configuration j'utilise un systeme d'environment. J'ai volontairement mis les environments dans le .gitignore car ils contiennent notement des mots de passe. Il y a une classe ts dans chanque projet pour décrire les environments, comme ca c'est facile de savoir quoi y mettre.

## Documentation
Si possible le code doit etre documenté, ce n'est pas encore fait pour certaines parties mais c'est prévu. J'ai écrit la doccumentation et le code en anglais parce que ça me perturbe d'avoir du francais dans le code.
On doccumente les dossiers avec un fichier DOC.md et les fichiers avec JSDoc. On pourras aussi regarder Github Blocks quand ce sera sortit de maniere stable.

## Test
Il faudrai faire des tests unitaires pour tous les endpoints coté backend, coté frontend je ne pense pas que ca vaille le coup.

## Base de donnée
On utilise mongoDB avec la librairie Mongoose.
Je n'ai pas inclus les identifiants mais vous pouvez creer gratuitement un cluster pour le développement sur https://mongodb.com. Sur le cluster, vous pouvez ensuite mettre plusieurs bases de donnée pour les différrents profiles de développement.
Par exemple une pour le développement et une pour les tests, car les tests vident la base de donnée.

## Lancer le projet
J'ai personnelement les run configuration suivantes :
- Lancer le backend sur un profile de développement (/back/package.json > dev).
- Lancer le backend sur un profile de test (/back/package.json > dev avec la variable d'environment NODE_ENV=test).
- Tester le backend (/back/package.json > test).
- Vider la base de donné (/back/package.json > clear-db).
- Lancer le frontend (/front/package.json > start).
