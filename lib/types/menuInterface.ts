import { categoryInterface } from "./categoryInterface"

export interface menuInterface {
    id: string
    categoryId?: string
    category: categoryInterface | string
    productName: string
    productDescription?: string
    productDestcription?: string
    images: string
    productPricing: number | string
    stock: number
    isAvailable: boolean
    isBestSeller: boolean
    isFeatured?: boolean
}

//   id                 String   @id @default(uuid())
//   categoryId         String   @map("category_id")
//   category           Category @relation(fields: [categoryId], references: [id])
//   productName        String
//   productDescription String
//   images             String
//   ProductPricing     Int
//   stock              Int
//   isAvailable        Boolean  @default(true) @map("is_available")
//   isBestSeller       Boolean  @default(false) @map("is_best_seller")
//   isFeatured         Boolean  @default(false) @map("is_featured")
//   createdAt          DateTime @default(now()) @map("created_at")
//   updatedAt          DateTime @default(now()) @map("updated_at")