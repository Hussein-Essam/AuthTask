import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  logger.log('Application is starting...');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints ?? {}; // Use an empty object if constraints is undefined

          return Object.values(constraints).join(', ');
        });
        return new BadRequestException(messages.join(', '));
      },
    }),
  );
  const appConfig = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('Auth App')
    .setDescription('API documentation for Auth App.')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const port = appConfig.get<number>('PORT') || 3000;

  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}
bootstrap();
