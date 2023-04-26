import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HeroById } from '../interfaces/hero-by-id.interface';
import { HeroName } from '../interfaces/hero-name.interface';
import { HeroesService } from '../interfaces/hero-service.interface';
import { Hero } from '../interfaces/hero.interface';
import { Heros } from '../interfaces/heros.interface';

@Injectable()
export class AppService implements OnModuleInit {
  private heroes1Service: HeroesService;
  private heroes2Service: HeroesService;

  constructor(
    @Inject('HERO_PACKAGE1') private client1: ClientGrpc,
    @Inject('HERO_PACKAGE2') private client2: ClientGrpc,
  ) {}

  onModuleInit() {
    this.heroes1Service =
      this.client1.getService<HeroesService>('HeroesService1');
    this.heroes2Service =
      this.client2.getService<HeroesService>('HeroesService2');
  }

  getHero1(id: HeroById): Observable<Hero> {
    return this.heroes1Service.Micro1BuscarHeroe(id);
  }

  getHero2(id: HeroById): Observable<Hero> {
    return this.heroes2Service.Micro2BuscarHeroe(id);
  }

  getHero3(hero: Observable<HeroName>): Observable<Hero> {
    return this.heroes2Service.Ejemplo1(hero);
  }

  getHero4(): Observable<Heros> {
    return this.heroes2Service.Ejemplo2({});
  }
}
