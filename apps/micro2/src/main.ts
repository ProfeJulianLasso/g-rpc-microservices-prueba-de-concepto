import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { Micro2Module } from './micro2.module';

async function bootstrap() {
  const app = await NestFactory.create(Micro2Module);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  // await app.listen(3002);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
