import { Injectable } from "@nestjs/common";
import { TrainingDTO } from "./training.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './training.schema';
import mongoose from 'mongoose';

@Injectable()
export class TrainingDAO {
    constructor(@InjectModel(Training.name) private training: mongoose.Model<Training>) {}

    async getTraining(trainingId: string): Promise<TrainingDTO> {
        console.log(JSON.stringify(this.training.find().exec()));
        return await this.training.find({ trainingId: trainingId }).exec();
    }
    
}