import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './configs/grpc-client.options';
import { Micro1Module } from './micro1.module';

const bootstrap = () => {
  NestFactory.create(Micro1Module).then((app) => {
    app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
    app.startAllMicroservices().then(() => {
      console.log(
        `🚀 Application is running on: ${
          (app.getMicroservices()[0] as any).server.url
        }`,
      );
    });
  });
  // const app = await NestFactory.create(Micro1Module);
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  // app.startAllMicroservices().then(() => {
  //   console.log(
  //     `🚀 Application is running on: ${
  //       (app.getMicroservices()[0] as any).server.url
  //     }`,
  //   );
  // });
  // await app.startAllMicroservices();
  // console.log(
  //   `🚀 Application is running on: ${
  //     (app.getMicroservices()[0] as any).server.url
  //   }`,
  // );
};

bootstrap();
