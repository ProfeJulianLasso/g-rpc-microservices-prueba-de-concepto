import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE1',
        transport: Transport.GRPC,
        options: {
          package: ['hero1'],
          protoPath: [join(process.cwd(), 'proto', 'hero1.proto')],
          url: 'localhost:5001',
        },
      },
      {
        name: 'HERO_PACKAGE2',
        transport: Transport.GRPC,
        options: {
          package: ['hero2'],
          protoPath: [join(process.cwd(), 'proto', 'hero2.proto')],
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
