/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../../../modules/pokemons/pokemons.controller';
import { PokemonsService } from '../../../modules/pokemons/pokemons.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { Pokemon } from 'src/modules/pokemons/entities/pokemon.entity';
import { UpdatePokemonDto } from 'src/modules/pokemons/dto/update-pokemon.dto';

const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    type: 'grass',
    hp: 45,
    sprites: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    ],
  },
  {
    id: 2,
    name: 'ivysaur',
    type: 'grass',
    hp: 60,
    sprites: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
    ],
  },
];

describe('PokemonsController', () => {
  let controller: PokemonsController;
  let service: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [PokemonsService],
    }).compile();

    controller = module.get<PokemonsController>(PokemonsController);
    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have called the service with correct parameter', async () => {
    const dto: PaginationDto = { limit: 10, page: 1 };

    jest.spyOn(service, 'findAll');

    await controller.findAll(dto);

    expect(service.findAll).toHaveBeenCalled();
    expect(service.findAll).toHaveBeenCalledWith(dto);
  });

  it('should have called the service and check the result', async () => {
    const dto: PaginationDto = { limit: 10, page: 1 };

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(mockPokemons));

    const pokemons = await controller.findAll(dto);

    expect(pokemons).toBe(mockPokemons);
    expect(pokemons.length).toBe(mockPokemons.length);
  });

  it('should have called the service with the correct id (findOne)', async () => {
    const spy = jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(mockPokemons[0]));

    const id = '1';

    const pokemon = await controller.findOne(id);

    expect(spy).toHaveBeenCalledWith(+id);
    expect(pokemon).toEqual(mockPokemons[0]);
  });

  it('should have called the service with the correct id and data (update)', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve('Pokemon updated'));

    const id = '1';
    const dto: UpdatePokemonDto = {};

    const result = await controller.update(id, dto);

    expect(result).toBe('Pokemon updated');
  });

  it('should have called delete with the correct id (delete)', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve('Pokemon deleted'));

    const id = '1';

    const result = await controller.remove(id);

    expect(result).toBe('Pokemon deleted');
  });
});
