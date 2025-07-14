import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = process.env.APP_PORT || configService.get<string>('server.port') || "3001";
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger 설정 - 환경에 따라 다르게 설정
  if (nodeEnv !== 'production') {
    console.log(`Swagger UI is enabled in ${nodeEnv} environment`);
    
    // 개발 환경 Swagger 설정
    const options = new DocumentBuilder()
      .setTitle('NestJS API - Development')
      .setDescription('NestJS API Documentation for Development Environment')
      .setVersion('1.0')
      .addTag('cats')
      .addTag('auth')
      .addBearerAuth()
      .addServer('http://localhost:3000', '개발 서버')
      .addServer('http://localhost:3001', '로컬 프로덕션 서버')
      .build();
    
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  } else {
    // 운영 환경에서는 제한된 Swagger 설정 (선택적)
    console.log('Swagger UI is configured for production environment');
    
    const options = new DocumentBuilder()
      .setTitle('NestJS API - Production')
      .setDescription('NestJS API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, options);
    // 운영 환경에서는 특정 경로나 접근 제한을 둘 수 있음
    SwaggerModule.setup('api-docs', app, document);
  }

  app.use(cookieParser());
  console.log(`Application is running on port: ${port} in ${nodeEnv} environment`);
  await app.listen(port);
}
bootstrap();