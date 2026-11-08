import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Render, Req, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guard/auth.guard.js";
import { ItemService } from "../service/item.service.js";
import { createItemDto, updateItemDto } from "../dto/item.dto.js";
import type { SessionData } from "express-session";

@Controller('item')
@UseGuards(AuthGuard)
export class ItemController {
    constructor(private ItemService: ItemService) {}

    // View Endpoints

    @Get() @Render('item/index')
    async index(@Query('q') q?: string) {
      return { title: 'Items', active: 'item', q,
               items: await this.ItemService.getAllWithCategory(q) };
    }
  
    @Get('create') @Render('item/form')
    async createView() {
      return { title: 'Create Item', active: 'item', action: '/item', item: {},
               categories: await this.ItemService.getCategories() };
    }
  
    @Get(':id/edit') @Render('item/form')
    async updateView(@Param('id') id: string) {
      return { title: 'Edit Item', active: 'item', action: `/item/${id}/update`,
               item: await this.ItemService.get(id),
               categories: await this.ItemService.getCategories() };
    }

    // API Endpoints

    @Post()
    create(@Body() dto: createItemDto, @Req() req: Request, 
        @Session() session: SessionData) {
        return this.ItemService.create(dto, session.userId);
    }

    @Get()
    findAll(){
        return this.ItemService.getAll();
    }

    @Get(":id")
    findOne(@Param('id') ItemId: string){
        return this.ItemService.get(ItemId);
    }

    @Patch(":id")
    update(
        @Param('id') ItemId: string,
        @Body() dto: updateItemDto,
        @Session() session: SessionData
    ){
        return this.ItemService.update(ItemId, dto, session.userId);
    }

    @Delete(":id")
    @HttpCode(204)
    delete(@Param('id') ItemId: string){
        return this.ItemService.delete(ItemId);
    }

}