import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ItemService } from './item.service';
import { Item } from './item.schema';
import { ItemDto } from './item.dto';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createNewItem(@Body() item: ItemDto): Promise<Item> {
    return this.itemService.create(item);
  }

  @Get()
  getAllItems(): Promise<Item[]> {
    return this.itemService.read();
  }
}
