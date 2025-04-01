// src/surveys/surveys.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { CaracterialSurvey } from './entities/caracterial-survey.entity';
import { SocialSurvey } from './entities/social-survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaracterialSurvey, SocialSurvey])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
