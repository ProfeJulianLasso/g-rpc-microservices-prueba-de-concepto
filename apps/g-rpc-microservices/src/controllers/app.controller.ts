import { Controller, Get } from '@nestjs/common';
import { Observable, ReplaySubject, map, toArray } from 'rxjs';
import { HeroName } from '../interfaces/hero-name.interface';
import { Hero } from '../interfaces/hero.interface';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly heroesService: AppService) {}

  @Get('callMicro1')
  callMicro1(): Observable<Hero> {
    return this.heroesService.getHero1({ id: 1 });
  }

  @Get('callMicro2')
  callMicro2(): Observable<Hero> {
    return this.heroesService.getHero2({ id: 2 });
  }

  @Get('callMicro2Stream')
  call3Stream(): Observable<Hero[]> {
    const hero = new ReplaySubject<HeroName>();
    hero.next({ name: 'Superman' });
    hero.next({ name: 'Batman' });
    hero.complete();

    const stream = this.heroesService.getHero3(hero.asObservable());

    return stream.pipe(toArray());
  }

  @Get('callMicro2StreamEmpty')
  call4Stream(): Observable<Hero[]> {
    return this.heroesService.getHero4().pipe(map((data) => data.heros));
  }
}
