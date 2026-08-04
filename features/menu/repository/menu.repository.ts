import { prisma } from "@/lib/db/index";
import { CreatedMenuDto } from "../validators/menu.validator";

export class MenuRepository{
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
    async created(data: CreatedMenuDto){
        return prisma.menu.create({
            data,
            include: {
                category: true,
            }
        });
    }
}