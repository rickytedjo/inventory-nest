import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../core/database/prisma.service.js";
import { createItemDto, updateItemDto } from "../dto/item.dto.js";
import { db } from "../../../prisma/db.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


@Injectable()
export class ItemService{
    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

        getCategories() { return db.orm.public.Kategori.all(); }
    
        async create(dto: createItemDto, userId: string){
            const data: any = { ...dto };
            return await db.orm.public.Item.create({
                ...data,
                createdBy: userId,
                updatedBy: userId
            });
        }
        async get( itemId: string){
            const data = await db.orm.public.Item.first({id:itemId});
            if(!data?.id) throw new NotFoundException("Item not found");
            return data;
        }
        async getAll(){
            const data = await db.orm.public.Item.all();
            
            return data;
        }

        async getAllWithCategory(q?: string) {
          const [items, cats] = await Promise.all([
            db.orm.public.Item.all(),
            db.orm.public.Kategori.all(),
          ]);
          const names = new Map(cats.map((c: any) => [c.id, c.name]));
          let rows = items.map((i: any) => ({ ...i, kategori_name: names.get(i.kategori_id) ?? '-' }));
          if (q) {
            const s = q.toLowerCase();
            rows = rows.filter((r: any) =>
              r.name?.toLowerCase().includes(s) || r.kategori_name.toLowerCase().includes(s));
          }
          return rows;
        }
        
        async getBy(filters: Record<string,any>){
            let query: any = db.orm.public.Item;

    
            for (const [key, value] of Object.entries(filters)) {
              query = query.where({ [key]: value });
            }
        
            return query.all();
        }
        async update( itemId:string, dto: updateItemDto, userId: string){
            try{
                const data: any = { ...dto};
                return await db.orm.public.Item.where({ id: itemId }).update({
                    ...data,
                    updatedBy: userId
                });
            }
            catch(err){
                if (err instanceof PrismaClientKnownRequestError) {
                  if (err.code === 'P2025') throw new NotFoundException("Item not found");
                  if (err.code === 'P2002') throw new ConflictException('Item already exists');
                }
                throw err;
            }
        }
        async delete( itemId: string){
            const res = await db.orm.public.Item.where({ id: itemId }).delete();
            if (!res) throw new NotFoundException("Item not found");
            return res;
        }
}