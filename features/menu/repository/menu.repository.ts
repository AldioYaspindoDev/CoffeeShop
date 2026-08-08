import { prisma } from "@/lib/db/index";
import { CreatedMenuDto, UpdatedMenuDto } from "../validators/menu.validator";
import { Prisma } from "@prisma/client";
import { menuInterface } from "@/lib/types/menuInterface";

export class MenuRepository {
    // Logik Get All
    async findAll() {
        return prisma.menu.findMany({
            where: {
                isAvailable: true,
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });
    }

    // Logik created
    async created(data: CreatedMenuDto) {
        return prisma.menu.create({
            data,
            include: {
                category: true,
            }
        });
    }

    // Logika updated
    async updated(data: UpdatedMenuDto, id: string) {
        // Cast input data parsing menjadi menuInterface parsial
        const menuData = data as Partial<menuInterface>;

        // Pisahkan key yang tidak dimasukkan secara mentah ke database
        const { id: _, category, productDestcription, ...updateData } = menuData;

        const prismaUpdateData: Prisma.MenuUpdateInput = {
            ...updateData,
            productPricing: updateData.productPricing !== undefined ? Number(updateData.productPricing) : undefined,
            stock: updateData.stock !== undefined ? Number(updateData.stock) : undefined,
        };

        return prisma.menu.update({
            where: { id },
            data: prismaUpdateData
        });
    }

    // Logika deleted
    async deleted(id: string) {
        return prisma.menu.delete({ 
            where: {
                id
            }
        })
    }
}