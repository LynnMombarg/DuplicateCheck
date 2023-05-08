// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Body, Controller, Post, Req } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('create')
  createModel(@Body() model: CreateModelDTO, @Req() request) {
    this.modelService.createModel(model, /*request.user.userid*/ 'token');
  }
}
