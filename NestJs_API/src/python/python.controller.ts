import { Controller, Get } from '@nestjs/common';
import { PythonService } from './python.service';
import { UserDtoContainer } from './python.userDtoContainer';


@Controller('python')
export class PythonController {
    constructor(private readonly pythonService: PythonService) {}


    @Get()
    async getAllItems(): Promise<UserDtoContainer> {
        const value = await this.pythonService.getItem();
        return value;
    }

}