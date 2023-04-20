import { Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly heroesService: AppService) {}

  @Get()
  call1(): Observable<Hero> {
    return this.heroesService.getHero1({ id: 1 });
  }

  @Post()
  call2(): Observable<Hero> {
    return this.heroesService.getHero2({ id: 2 });
  }
}
