import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { Micro1Module } from './micro1.module';

async function bootstrap() {
  const app = await NestFactory.create(Micro1Module);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  // await app.listen(3001);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
