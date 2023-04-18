import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserDtoContainer } from './python.userDtoContainer';

@Injectable()
export class PythonService {

    async getItem(): Promise<UserDtoContainer> {
        const response = await axios.get("http://127.0.0.1:8000/get-candidates");
        return response.data as UserDtoContainer;
    }
}
