import { NextRequest, NextResponse } from "next/server";
import { MenuService } from "@/features/menu/service/menu.service";

const service = new MenuService();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const menu = await service.updatedMenu(data, id);

    return NextResponse.json(menu, {
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


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const menu = await service.deletedMenu(id);

    return NextResponse.json({
      success: true,
      message: "Berhasil menghapus menu",
      menu
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal menghapus data",
        error,
      },
      {
        status: 400,
      }
    );
  }
}