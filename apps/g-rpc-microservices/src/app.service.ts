import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HeroesService } from './hero-service.interface';

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

  getHero1(id: { id: number }): Observable<string> {
    return this.heroes1Service.findOne(id);
  }

  getHero2(id: { id: number }): Observable<string> {
    return this.heroes2Service.findTwo(id);
  }
}
