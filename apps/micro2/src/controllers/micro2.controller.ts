/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata, ServerDuplexStream, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { HeroById } from '../interfaces/hero-by-id.interface';
import { HeroName } from '../interfaces/hero-name.interface';
import { Hero } from '../interfaces/hero.interface';
import { Heros } from '../interfaces/heros.interface';

@Controller()
export class Micro2Controller {
  items = [
    {
      id: 1,
      name: 'Ironman',
      data: [
        { id: 1, name: 'Ironman' },
        { id: 2, name: 'Spiderman' },
      ],
    },
    {
      id: 2,
      name: 'Spiderman',
      data: [
        { id: 1, name: 'Ironman' },
        { id: 2, name: 'Spiderman' },
      ],
    },
    {
      id: 3,
      name: 'Superman',
      data: [
        { id: 1, name: 'Ironman' },
        { id: 2, name: 'Spiderman' },
      ],
    },
    {
      id: 4,
      name: 'Batman',
      data: [
        { id: 1, name: 'Ironman' },
        { id: 2, name: 'Spiderman' },
      ],
    },
  ];

  @GrpcMethod('HeroesService2', 'Micro2BuscarHeroe')
  micro2BuscarHeroe(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | undefined {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('HeroesService2', 'Ejemplo1')
  ejemplo1(
    data: Observable<HeroName>,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Observable<Hero> {
    const hero = new Subject<Hero>();
    data.subscribe({
      next: (name: HeroName) => {
        const item = this.items.find(({ name: n }) => n === name.name);
        if (item) hero.next(item);
      },
      complete: () => hero.complete(),
    });
    return hero.asObservable();
  }

  @GrpcStreamMethod('HeroesService2', 'FindAllWithoutStreamParam')
  findAllWithoutStreamParam(
    data: Observable<any>,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Observable<Heros> {
    const hero = new Subject<Heros>();
    hero.next({ heros: this.items });
    hero.complete();
    return hero.asObservable();
  }

  @GrpcMethod('HeroesService2', 'Ejemplo2')
  ejemplo2(
    data: object,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Heros {
    return { heros: this.items };
  }
  // ejemplo(
  //   data: Observable<object>,
  //   metadata: Metadata,
  //   call: ServerDuplexStream<any, any>,
  // ): Observable<Heros> {
  //   const hero = new ReplaySubject<Heros>();
  //   hero.next({ heros: this.items });
  //   hero.complete();
  //   return hero.asObservable();
  // }
}
