import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelDto } from './dto/model.dto';
import { ModelDao } from './model.dao';
import { CreateModelDto } from './dto/create-model.dto';
import { AuthDao } from '../login/auth.dao';
import { PythonDao } from '../python/python.dao';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDao: ModelDao,
    private readonly authDao: AuthDao,
    private readonly pythonDao: PythonDao,
  ) {}

  public createModel(createModel: CreateModelDto): void {
    const userId: string = this.authDao.getUserId(createModel.token);

    if (userId != null) {
      const fileName: string = uuid() + '.pkl';
      const model = new ModelDto(
        createModel.modelName,
        fileName,
        createModel.tableName,
        createModel.modelDescription,
        userId,
      );
      this.modelDao.createModel(model);
      this.pythonDao.createModel(fileName);
    } else {
      throw new UnauthorizedException();
    }
  }
}
