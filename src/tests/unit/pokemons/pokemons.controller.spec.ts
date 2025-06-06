import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../../../modules/pokemons/pokemons.controller';
import { PokemonsService } from '../../../modules/pokemons/pokemons.service';

describe('PokemonsController', () => {
  let controller: PokemonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [PokemonsService],
    }).compile();

    controller = module.get<PokemonsController>(PokemonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
