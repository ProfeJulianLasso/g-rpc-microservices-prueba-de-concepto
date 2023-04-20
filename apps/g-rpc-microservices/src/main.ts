import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function bootstrap() {
  NestFactory.create(AppModule).then((app) => {
    app.listen(3000).then(() => {
      app.getUrl().then((url) => {
        console.log(`🚀 Application is running on: ${url}`);
      });
    });
  });
  // const app = await NestFactory.create(AppModule);
  // app.listen(3000).then(() => {
  //   app.getUrl().then((url) => {
  //     console.log(`🚀 Application is running on: ${url}`);
  //   });
  // });
  // await app.listen(3000);
  // console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
