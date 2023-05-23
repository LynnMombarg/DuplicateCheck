/**
 * Author(s): Diederik
 * Last modified: 11-05-2023
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelModule } from './model/model.module';
import { TrainingModule } from './training/training.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/env/' + process.env.NODE_ENV + '.env',
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ModelModule,
    TrainingModule,
  ],
})
export class AppModule {}
