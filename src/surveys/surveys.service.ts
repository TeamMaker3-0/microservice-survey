// src/surveys/surveys.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaracterialSurvey } from './entities/caracterial-survey.entity';
import { SocialSurvey } from './entities/social-survey.entity';
import { max } from 'class-validator';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(CaracterialSurvey)
    private readonly caracterialRepo: Repository<CaracterialSurvey>,
    @InjectRepository(SocialSurvey)
    private readonly socialRepo: Repository<SocialSurvey>,
  ) {}

  // Encuesta Caracterial
  async createOrUpdateCaracterialSurvey(
    studentId: string,
    responses: any,
  ): Promise<CaracterialSurvey> {
    let survey = await this.caracterialRepo.findOne({ where: { studentId } });
    if (survey) {
      survey.responses = responses;
      survey.isCompleted = true;
      return this.caracterialRepo.save(survey);
    } else {
      survey = this.caracterialRepo.create({ studentId, responses });
      return this.caracterialRepo.save(survey);
    }
  }

  async getCaracterialSurvey(studentId: string): Promise<CaracterialSurvey> {
    const survey = await this.caracterialRepo.findOneBy({ studentId });
    if (!survey) {
      throw new NotFoundException(
        'Encuesta caracterial no encontrada para este estudiante',
      );
    }
    return survey;
  }

  async getallcaracterialSurvey(): Promise<CaracterialSurvey[]> {
    const survey = await this.caracterialRepo.find();
    if (!survey) {
      throw new NotFoundException(
        'Encuesta caracterial no encontrada para este estudiante',
      );
    }
    return survey;
  }

  //get all social survey
  async getallSocialSurvey(): Promise<SocialSurvey[]> {
    const survey = await this.socialRepo.find();
    if (!survey) {
      throw new NotFoundException(
        'Encuesta social no encontrada para este estudiante',
      );
    }
    return survey;
  }

  // Encuesta Social
  async createOrUpdateSocialSurvey(
    studentId: string,
    courseId: string,
    responses: any,
  ): Promise<SocialSurvey> {
    let survey = await this.socialRepo.findOne({
      where: { studentId, courseId },
    });
    if (survey) {
      survey.responses = responses;
      survey.isCompleted = true;
      return this.socialRepo.save(survey);
    } else {
      survey = this.socialRepo.create({ studentId, courseId, responses });
      return this.socialRepo.save(survey);
    }
  }

  async getSocialSurvey(
    studentId: string,
    courseId: string,
  ): Promise<SocialSurvey> {
    const survey = await this.socialRepo.findOne({
      where: { studentId, courseId },
    });
    if (!survey) {
      throw new NotFoundException(
        'Encuesta social no encontrada para este estudiante en el curso indicado',
      );
    }
    return survey;
  }

  /**
   * Recibe un array de 45 respuestas, calcula el eneatipo dominante y
   * retorna un string con el resultado.
   */
  calculateEneatype(answers: number[]): string {
    // Verificamos que haya 45 respuestas
    if (answers.length !== 45) {
      throw new BadRequestException('Se requieren exactamente 45 respuestas');
    }

    // Inicializamos un array para acumular el total de cada eneatipo (1..9)
    const totals = new Array(9).fill(0);

    // Recorremos las 45 respuestas y sumamos según la regla de rangos
    // (índice 0..4 -> eneatipo 1, 5..9 -> eneatipo 2, etc.)
    answers.forEach((answer, index) => {
      let eneaIndex = 0;

      if (index < 5) {
        eneaIndex = 0; // eneatipo 1
      } else if (index < 10) {
        eneaIndex = 1; // eneatipo 2
      } else if (index < 15) {
        eneaIndex = 2; // eneatipo 3
      } else if (index < 20) {
        eneaIndex = 3; // eneatipo 4
      } else if (index < 25) {
        eneaIndex = 4; // eneatipo 5
      } else if (index < 30) {
        eneaIndex = 5; // eneatipo 6
      } else if (index < 35) {
        eneaIndex = 6; // eneatipo 7
      } else if (index < 40) {
        eneaIndex = 7; // eneatipo 8
      } else {
        eneaIndex = 8; // eneatipo 9
      }

      totals[eneaIndex] += answer;
    });

    // Identificamos el eneatipo con el puntaje máximo
    const maxScore = Math.max(...totals);
    const dominantEneatype = totals.indexOf(maxScore) + 1; // +1 para pasar de índice (0..8) a eneatipo (1..9)
    console.log(`maxScore: ${maxScore}, dominantEneatype: ${dominantEneatype}`);
    // Retornamos un string con el resultado

    return dominantEneatype.toString();
  }
}
