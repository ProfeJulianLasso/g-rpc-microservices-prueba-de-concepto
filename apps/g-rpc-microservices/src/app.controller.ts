import { Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly heroesService: AppService) {}

  @Get()
  call1(): Observable<any> {
    return this.heroesService.getHero1({ id: 1 });
  }

  @Post()
  call2(): Observable<any> {
    return this.heroesService.getHero2({ id: 1 });
  }
}
