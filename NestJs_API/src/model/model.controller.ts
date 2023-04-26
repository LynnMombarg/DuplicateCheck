import { Get, Headers, Controller, Res, HttpStatus } from '@nestjs/common';
import { ModelService } from './model.service';
import { DisplayDTO } from './display-model.DTO';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/models')
  getAllModels(
    @Headers('Authorization') accesToken: string
  ): Promise<DisplayDTO[]> {
    return this.modelService.getAllModels(accesToken);
  }
}
