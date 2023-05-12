// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatasetDTO } from '../dto/dataset.dto';

export type TrainingDocument = HydratedDocument<Training>;

@Schema()
export class Training {
    @Prop()
    trainingId: string;

    @Prop()
    userId: string;

    @Prop()
    datasetA: DatasetDTO;

    @Prop()
    datasetB: DatasetDTO;

    @Prop()
    matches: boolean[];
}

export const TrainingSchema = SchemaFactory.createForClass(Training);