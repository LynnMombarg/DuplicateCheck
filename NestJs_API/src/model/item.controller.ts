import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.schema';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getHello(): Promise<Item[]> {
    return this.itemService.findAll();
  }
}
