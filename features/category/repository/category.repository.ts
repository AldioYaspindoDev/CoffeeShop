import { prisma } from "@/lib/db/index"
import { CreatedCategoryDto } from "../validators/category.validators"

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
}

