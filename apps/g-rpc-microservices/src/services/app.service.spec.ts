import { ClientGrpc } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { from } from 'rxjs';
import { HeroById } from '../interfaces/hero-by-id.interface';
import { Hero } from '../interfaces/hero.interface';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  let client1: ClientGrpc;
  let client2: ClientGrpc;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'HERO_PACKAGE1',
          useValue: { getService: jest.fn() },
        },
        {
          provide: 'HERO_PACKAGE2',
          useValue: { getService: jest.fn() },
        },
      ],
    }).compile();
    appService = module.get<AppService>(AppService);
    client1 = module.get<ClientGrpc>('HERO_PACKAGE1');
    client2 = module.get<ClientGrpc>('HERO_PACKAGE2');
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHero1', () => {
    it('should return a hero', (done) => {
      // Arrange
      const id = { id: 1 } as HeroById;
      const idExpected = { id: 1 } as HeroById;
      const hero = { id: 1, name: 'Superman' } as Hero;
      const expected = { id: 1, name: 'Superman' } as Hero;
      const findOneSpy = jest.fn().mockImplementation(() => from([hero]));
      jest.spyOn(client1, 'getService').mockImplementation(() => ({
        Micro1BuscarHeroe: findOneSpy,
      }));

      // Act
      appService.onModuleInit();
      const result = appService.getHero1(id);

      // Assert
      result.subscribe({
        next: (response) => {
          expect(response).toEqual(expected);
          expect(findOneSpy).toHaveBeenCalledWith(idExpected);
          done();
        },
      });
    });
  });

  describe('getHero2', () => {
    it('should return a hero', (done) => {
      // Arrange
      const id = { id: 2 } as HeroById;
      const idExpected = { id: 2 } as HeroById;
      const hero = { id: 2, name: 'Batman' } as Hero;
      const expected = { id: 2, name: 'Batman' } as Hero;
      const findTwoSpy = jest.fn().mockImplementation(() => from([hero]));
      jest.spyOn(client2, 'getService').mockImplementation(() => ({
        Micro2BuscarHeroe: findTwoSpy,
      }));

      // Act
      appService.onModuleInit();
      const result = appService.getHero2(id);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(expected);
        expect(findTwoSpy).toHaveBeenCalledWith(idExpected);
        done();
      });
    });
  });
});
