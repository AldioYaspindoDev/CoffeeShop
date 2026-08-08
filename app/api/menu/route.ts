import { NextRequest, NextResponse } from "next/server";
import { MenuService } from "@/features/menu/service/menu.service";
import { CreatedMenuSchema } from "@/features/menu/validators/menu.validator";

const service = new MenuService();

export async function GET() {
    const menus = await service.getMenus();

    return NextResponse.json(menus);
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        const data = CreatedMenuSchema.parse(body);

        const menu = await service.createdMenu(data);

        return NextResponse.json(menu, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: "Validasi Gagal",
            error
        },{
            status: 400
        });
    }
}
