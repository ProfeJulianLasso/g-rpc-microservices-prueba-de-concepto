import { Observable } from 'rxjs';
import { HeroById } from './hero-by-id.interface';
import { HeroName } from './hero-name.interface';
import { Hero } from './hero.interface';
import { Heros } from './heros.interface';

export interface HeroesService {
  Micro1BuscarHeroe(data: HeroById): Observable<Hero>;
  Micro2BuscarHeroe(data: HeroById): Observable<Hero>;
  Ejemplo1(data: Observable<HeroName>): Observable<Hero>;
  Ejemplo2(data: object): Observable<Heros>;
}
