import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('secret/private-key.pem'),
  cert: fs.readFileSync('secret/public-certificate.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      http2: true,
      https: httpsOptions
    }),
  );

  // Enable HTTP/2
  // app.register(fastif);

  await app.listen(4000, '0.0.0.0');
}

bootstrap();
