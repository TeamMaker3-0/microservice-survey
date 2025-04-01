// src/surveys/surveys.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CaracterialSurvey } from './entities/caracterial-survey.entity';
import { SocialSurvey } from './entities/social-survey.entity';
import { CalculateEneatypeDto } from './dto/calculate-eneatype.dto';
import { get } from 'http';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  // --- Encuesta Caracterial ---
  @Post('caracterial')
  async createOrUpdateCaracterial(@Body() body: { studentId: string; responses: any }): Promise<CaracterialSurvey> {
    const { studentId, responses } = body;
    return this.surveysService.createOrUpdateCaracterialSurvey(studentId, responses);
  }

  @Get('caracterial')
  async getCaracterial(@Query('studentId') studentId: string): Promise<CaracterialSurvey> {
    return this.surveysService.getCaracterialSurvey(studentId);
  }

  @Get('all-caracterial')
  async getAllCaracterial(): Promise<CaracterialSurvey[]> {
    return this.surveysService.getallcaracterialSurvey();
  }

  @Get('all-social')
  async getAllSocial(): Promise<SocialSurvey[]> {
    return this.surveysService.getallSocialSurvey();
  }

  // --- Encuesta Social ---
  @Post('social')
  async createOrUpdateSocial(@Body() body: { studentId: string; courseId: string; responses: any }): Promise<SocialSurvey> {
    const { studentId, courseId, responses } = body;
    return this.surveysService.createOrUpdateSocialSurvey(studentId, courseId, responses);
  }

  @Get('social')
  async getSocial(
    @Query('studentId') studentId: string,
    @Query('courseId') courseId: string,
  ): Promise<SocialSurvey> {
    return this.surveysService.getSocialSurvey(studentId, courseId);
  }

  @Post('calculate-eneatype')
  calculateEneatype(@Body() dto: CalculateEneatypeDto): string {
    return this.surveysService.calculateEneatype(dto.answers);
  }
}
