/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Made the column `created_at` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CourseCategory" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");