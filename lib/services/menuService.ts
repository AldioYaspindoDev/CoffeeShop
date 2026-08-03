// import { prisma } from "@/lib/db"
// 
// /**
//  * Get all menus with optional category filter
//  */
// export async function getAllMenus(category?: string) {
//     return prisma.menu.findMany({
//         where: {
//             isAvailable: true,
//             ...(category && category !== "Semua"
//                 ? { category: { equals: category, mode: "insensitive" } }
//                 : {}),
//         },
//         orderBy: [
//             { isBestSeller: "desc" },
//             { createdAt: "desc" },
//         ],
//     })
// }
// 
// /**
//  * Get a single menu by ID
//  */
// export async function getMenuById(id: string) {
//     return prisma.menu.findUnique({
//         where: { id },
//     })
// }
// 
// /**
//  * Get all best seller menus
//  */
// export async function getBestSellerMenus() {
//     return prisma.menu.findMany({
//         where: {
//             isBestSeller: true,
//             isAvailable: true,
//         },
//     })
// }
