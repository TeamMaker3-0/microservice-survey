import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:3001',
  //     'http://localhost:3002',
  //     'http://localhost:3003',
  //     'http://localhost:3004',
  //   ], // Ajusta los orígenes según corresponda
  //   credentials: true, // Permite enviar/recibir cookies
  // });

  app.enableCors({
    origin: true, // Ajusta los orígenes según corresponda
    credentials: true, // Permite enviar/recibir cookies
  });

  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
