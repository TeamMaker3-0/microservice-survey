import { IsArray, ArrayMinSize, ArrayMaxSize, IsInt, Min, Max } from 'class-validator';

export class CalculateEneatypeDto {
  @IsArray()
  @ArrayMinSize(45, { message: 'Se requieren exactamente 45 respuestas' })
  @ArrayMaxSize(45, { message: 'Se requieren exactamente 45 respuestas' })
  // Cada elemento debe ser un entero entre 1 y 5
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  answers: number[];
}
