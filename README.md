# Absence Management
**This is a L3 MIASHS project by three students.**

It consists in designing a web application for teachers and school administrators, so that they can manage the absences of undergraduate students.

_Application features:_
- take the roll call
- view student absences by subject and date
- modify/add students to the database
- modify/add TD groups to the database

This project is coded in Javascript, TypeScript, HTML and CSS.

Diagrams fo the database, as well as other documents such as the decomposition of the website, can be found in the Visuals document.

# Front-end Setup
The front-end is coded with Vue.js. 
The front-end code is located in the `./GestionAbsencesFront/` directory. 

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Back-end Setup
The back-end is coded with NestJs with the ORM Prisma.
The back-end code is located in the `./GestionAbsenceBack/` directory.

```sh
npm install
```

### Database Configuration
- SQL Database.
- Recommanded URL in .env file
``` env
DATABASE_URL="file:./dev.db"
```
### Generate database file from schema.prisma
```sh
npx prisma migrate dev --name init
```

### Compile and Hot-Reload for Development

```sh
npm run start
```
