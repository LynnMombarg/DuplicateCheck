import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { TrainingService } from './training.service';
import { AuthGuard } from 'src/auth/auth.guard';

  @Controller('training')
  // @UseGuards(AuthGuard)
  export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    @Post('/save')
    saveTraining(@Body() json, @Req() req) {
        this.trainingService.saveTraining(json['modelId'], json['trainingId'], '123'); //123 = req.user.userId
    }

  }