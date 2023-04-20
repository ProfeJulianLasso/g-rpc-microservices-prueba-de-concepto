import { Observable } from 'rxjs';
import { Hero } from './hero.interface';

export interface HeroesService {
  findOne(data: { id: number }): Observable<Hero>;
  findTwo(data: { id: number }): Observable<Hero>;
}
