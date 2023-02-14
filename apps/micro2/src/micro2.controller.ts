import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroById } from './hero-by-id.interface';
import { Hero } from './hero.interface';

@Controller()
export class Micro2Controller {
  @GrpcMethod('HeroesService2', 'FindTwo')
  findTwo(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | undefined {
    const items = [
      { id: 1, name: 'John2' },
      { id: 2, name: 'Doe' },
    ];
    console.log('micro2');
    return items.find(({ id }) => id === data.id);
  }
}
