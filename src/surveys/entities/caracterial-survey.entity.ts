// src/surveys/entities/caracterial-survey.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['studentId'])
export class CaracterialSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // Identificador del estudiante

  @Column()
  @Column({ default: false })
  isCompleted: boolean; // Indica si la encuesta ha sido completada

  // Puedes guardar las respuestas en formato JSON o texto
  @Column({ type: 'json', nullable: true })
  responses: any;
}
