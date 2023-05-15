import { Injectable } from "@nestjs/common";
import { TrainingDAO } from "./training.dao";
import { PythonDAO } from "src/python/python.dao";

@Injectable()
export class TrainingService {

    constructor(private readonly trainingDAO: TrainingDAO, private readonly pythonDAO: PythonDAO) {}

    saveTraining(modelId: string, trainingId: string, userId: string) {
        const training = this.trainingDAO.getTraining(trainingId);
        this.pythonDAO.saveTraining(modelId, training);
    }

}