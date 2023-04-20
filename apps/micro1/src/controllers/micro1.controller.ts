import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroById } from '../interfaces/hero-by-id.interface';
import { Hero } from '../interfaces/hero.interface';

@Controller()
export class Micro1Controller {
  @GrpcMethod('HeroesService1', 'FindOne')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | undefined {
    const items = [
      { id: 1, name: 'John1' },
      { id: 2, name: 'Doe' },
    ];
    console.log('micro1');
    return items.find(({ id }) => id === data.id);
  }
}
