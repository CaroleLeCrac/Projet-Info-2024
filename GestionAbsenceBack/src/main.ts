import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });

  const config = new DocumentBuilder()
    .setTitle('API de gestion des absences')
    .setDescription('Cette API permet de gérer les absences de la licence MIASHS')
    .setVersion('1.0')
    .addTag('Etudiant')
    .addTag('Semestre')
    .addTag('ADE')
    .addTag('Matiere')
    .addTag('CSV')
    .addTag('Groupe')
    .addTag('Inscription')
    .addTag('Presence')
    .addTag('Type de session')
    .addTag('Creneaux')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
