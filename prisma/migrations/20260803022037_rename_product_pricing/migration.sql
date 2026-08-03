/*
  Warnings:

  - You are about to drop the column `ProductPricing` on the `menus` table. All the data in the column will be lost.
  - Added the required column `productPricing` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menus" DROP COLUMN "ProductPricing",
ADD COLUMN     "productPricing" INTEGER NOT NULL;
