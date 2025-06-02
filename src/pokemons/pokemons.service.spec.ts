import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pokemon', () => {
    const data = {
      name: 'Pikachu',
      type: 'Electric',
    };
    const result = service.create(data);

    expect(result).toBe('This action adds a new pokemon');
  });

  it('should return pokemon if exist', async () => {
    const id = 4;
    const result = await service.findOne(id);

    expect(result).toEqual({
      id: 4,
      name: 'charmander',
      type: 'fire',
      hp: 39,
      sprites: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
      ],
    });
  });

  it("should return 404 error if pokemon does'nt exits", () => {});
});
