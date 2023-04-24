import { Body, Controller, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDto } from './model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('create')
  createModel(@Body() model: ModelDto) {
    this.modelService.createModel(model);
  }
}
