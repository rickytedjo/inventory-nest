import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Render, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guard/auth.guard.js";
import { createCategoryDto, updateCategoryDto } from "../dto/category.dto.js";
import { CategoryService } from "../service/category.service.js";
import type { SessionData } from "express-session";

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    // View Endpoints

    @Get() @Render('category/index')
    async index(@Query('q') q?: string) {
      return { title: 'Categories', active: 'category', q,
               categories: await this.categoryService.getAll() };
    }

    @Get('create') @Render('category/form')
    createView() {
      return { title: 'Create Category', active: 'category', action: '/category', category: {} };
    }

    @Get(':id/edit') @Render('category/form')
    async updateView(@Param('id') id: string) {
      return { title: 'Edit Category', active: 'category',
               action: `/category/${id}/update`, category: await this.categoryService.get(id) };
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