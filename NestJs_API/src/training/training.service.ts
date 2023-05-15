import { Injectable } from "@nestjs/common";
import { TrainingDAO } from "./training.dao";
import { PythonDAO } from "src/python/python.dao";

@Injectable()
export class TrainingService {

    constructor(private readonly trainingDAO: TrainingDAO, private readonly pythonDAO: PythonDAO) {}

    async saveTraining(modelId: string, trainingId: string, userId: string) {
        const training = await this.trainingDAO.getTraining(trainingId);
        this.pythonDAO.saveTraining(modelId, training);
    }

}