import {
  IsNumber,
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  Min,
  IsArray,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  type: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  hp?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sprites?: string[];
}
