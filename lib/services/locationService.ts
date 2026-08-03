// import { prisma } from "@/lib/db"
// 
// /**
//  * Get all active store locations
//  */
// export async function getAllLocations() {
//     return prisma.location.findMany({
//         where: { isActive: true },
//         orderBy: { locationName: "asc" },
//     })
// }
// 
// /**
//  * Get a single location by ID
//  */
// export async function getLocationById(id: string) {
//     return prisma.location.findUnique({
//         where: { id },
//     })
// }
