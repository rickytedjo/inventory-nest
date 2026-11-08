import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guard/auth.guard.js";
import { createCategoryDto, updateCategoryDto } from "../dto/category.dto.js";
import { CategoryService } from "../service/category.service.js";
import type { SessionData } from "express-session";

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    // View Endpoints

    @Get('index')
    index() {
        return { message: 'Category index page' };
    }

    @Get('create')
    createView(){
        return { message: 'Category create page' };
    }

    @Get('show/:id')
    showView(@Param('id') CategoryId: string){
        return { message: `Category show page for ID: ${CategoryId}` };
    }

    @Get('update/:id')
    updateView(@Param('id') CategoryId: string){
        return { message: `Category update page for ID: ${CategoryId}` };
    }

    // API Endpoints

    @Post()
    create(
        @Body() dto: createCategoryDto,
        @Session() session: SessionData ) {
        return this.categoryService.create(dto, session.userId);
    }

    @Get()
    findAll(){
        return this.categoryService.getAll();
    }

    @Get(":id")
    findOne(@Param('id') CategoryId: string){
        return this.categoryService.get(CategoryId);
    }

    @Patch(":id")
    update(
        @Param('id') CategoryId: string,
        @Body() dto: updateCategoryDto,
        @Session() session: SessionData
    ){
        return this.categoryService.update(CategoryId, dto, session.userId);
    }

    @Delete(":id")
    delete(@Param('id') CategoryId: string){
        return this.categoryService.delete(CategoryId);
    }

}