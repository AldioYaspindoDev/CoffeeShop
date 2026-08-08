import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/features/category/service/category.service";

const service = new CategoryService();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const data = await request.json();

        const category = await service.updatedCategory(data, id);

        return NextResponse.json(category, {
            status: 200, // Menggunakan 200 OK untuk update data
        });
    } catch (error) {
        return NextResponse.json(
      {
        success: false,
        message: "gagal mengupdate data",
        error,
      },
      {
        status: 400,
      }
    );
    }
}

export async function DELETE(request: NextRequest, { params } : { params : Promise<{ id: string }> }) {
    try {
        const { id }  = await params;

        const category = await service.deletedCategory(id);

        return NextResponse.json({
            success: true,
            message: "Berhasil Menghapus Data",
            category
        },{
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Gagal Menghapus Data. Pastikan kategori tidak sedang digunakan oleh produk menu lain.",
            error
        },{
            status: 400
        });
    }
}