import { Body, Controller, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './create-model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('create')
  createModel(@Body() model: CreateModelDto) {
    this.modelService.createModel(model);
  }
}
