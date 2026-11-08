import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../core/database/prisma.service.js";
import { createCategoryDto, updateCategoryDto } from "../dto/category.dto.js";
import { db } from "../../../prisma/db.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


@Injectable()
export class CategoryService{
    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
    
        async create(dto: createCategoryDto, userId: string){
            const data: any = { ...dto };
            return await db.orm.public.Kategori.create({
                ...data,
                createdBy: userId,
                updatedBy: userId
            });
        }
        async get( categoryId: string){
            const data = await db.orm.public.Kategori.first({id:categoryId});
            if(!data) throw new NotFoundException("Category not found");
            return data;
        }
        async getAll(q?: string) {
          const data = Array.from(await db.orm.public.Kategori.all()) as any[];
          const rows = data.map((c) => ({ ...c }));
          const s = q?.trim().toLowerCase();
          if (!s) return rows;
          return rows.filter((c) =>
            String(c.name ?? '').toLowerCase().includes(s) ||
            String(c.description ?? '').toLowerCase().includes(s));
        }
        async getBy(filters: Record<string,any>){
            let query: any = db.orm.public.Kategori;

    
            for (const [key, value] of Object.entries(filters)) {
              query = query.where({ [key]: value });
            }
        
            return query.all();
        }
        async update( categoryId: string, dto: updateCategoryDto, userId: string){
            try{
                const data: any = { ...dto };
                return await db.orm.public.Kategori.where({ id: categoryId }).update({
                    ...data,
                    updatedBy: userId
                });
            }
            catch(err){
                 if (err instanceof PrismaClientKnownRequestError) {
                  if (err.code === 'P2025') throw new NotFoundException("Category not found");
                  if (err.code === 'P2002') throw new ConflictException('Category already exists');
                }
                throw err;
            }
        }
        async delete( categoryId: string){
            const res = await db.orm.public.Kategori.where({ id: categoryId }).delete();
            if (!res) throw new NotFoundException("Category not found");
            return res;
        }
}