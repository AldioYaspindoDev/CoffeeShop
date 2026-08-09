import { prisma } from "@/lib/db/index"
import { CreatedCategoryDto, UpdatedCategoryDto } from "../validators/category.validators"

export class CategoryRepository{
    async findAll(){
        return prisma.category.findMany({
            orderBy : {
                createdAt: "desc"
            }
        })
    }

    async created(data: CreatedCategoryDto){
        return prisma.category.create({
            data
        })
    }

    async updated(data: UpdatedCategoryDto, id : string){
        return prisma.category.update({
            where: { id },
            data: data
        })
    }

    async deleted(id: string){
        return prisma.category.delete({
            where: { id }
        })
    }
}

