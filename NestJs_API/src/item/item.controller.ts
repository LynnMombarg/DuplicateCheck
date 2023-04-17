import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ItemService } from './item.service';
import { Item } from './item.schema';
import { ItemDto } from './item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createNewItem(@Body() item: ItemDto): Promise<Item[]> {
    this.itemService.create(item);
    return this.itemService.read();
  }

  @Get()
  getAllItems(): Promise<Item[]> {
    return this.itemService.read();
  }

  @Put()
  updateItem(@Body() item: ItemDto): Promise<Item[]> {
    this.itemService.update(item);
    return this.itemService.read();
  }

  @Delete()
  deleteItem(@Body() item: ItemDto): Promise<Item[]> {
    this.itemService.delete(item);
    return this.itemService.read();
  }
}
