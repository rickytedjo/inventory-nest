import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guard/auth.guard.js";
import { ItemService } from "../service/item.service.js";
import { createItemDto, updateItemDto } from "../dto/item.dto.js";
import type { SessionData } from "express-session";

@Controller('item')
@UseGuards(AuthGuard)
export class ItemController {
    constructor(private ItemService: ItemService) {}

    // View Endpoints

    @Get('index')
    index() {
        return { message: 'Item index page' };
    }

    @Get('create')
    createView(){
        return { message: 'Item create page' };
    }

    @Get('show/:id')
    showView(@Param('id') ItemId: string){
        return { message: `Item show page for ID: ${ItemId}` };
    }

    @Get('update/:id')
    updateView(@Param('id') ItemId: string){
        return { message: `Item update page for ID: ${ItemId}` };
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