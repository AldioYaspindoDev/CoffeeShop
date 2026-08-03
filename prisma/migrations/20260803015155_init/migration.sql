/*
  Warnings:

  - You are about to drop the column `description` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `menus` table. All the data in the column will be lost.
  - Added the required column `ProductPricing` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDescription` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menus" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "ProductPricing" INTEGER NOT NULL,
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "productDescription" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
