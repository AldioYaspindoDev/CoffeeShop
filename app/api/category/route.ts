import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/features/category/service/category.service";
import { CreatedCategorySchema } from "@/features/category/validators/category.validators";

const service = new CategoryService();

export async function GET() {
    try {
        const categorys = await service.getCategorys();

        return NextResponse.json(categorys);

    } catch (error) {
        return NextResponse.json({
            message: "Data Tidak Ditemukan",error
        },{
            status: 404
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const data = CreatedCategorySchema.parse(body);

        const category = await service.createdCategory(data);

        return NextResponse.json(category, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: "Gagal Created",error
        },{
            status: 400
        });
    }
}
