// src/surveys/entities/social-survey.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SocialSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // Identificador del estudiante

  @Column()
  courseId: string; // Identificador del curso

  @Column()
  @Column({ default: false })
  isCompleted: boolean; // Indica si la encuesta ha sido completada

  // Respuestas de la encuesta en formato JSON o texto
  @Column({ type: 'json', nullable: true })
  responses: any;
}
