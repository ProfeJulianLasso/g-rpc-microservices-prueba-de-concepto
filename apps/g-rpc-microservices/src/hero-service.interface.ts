import { Observable } from 'rxjs';

export interface HeroesService {
  findOne(data: { id: number }): Observable<any>;
  findTwo(data: { id: number }): Observable<any>;
}
