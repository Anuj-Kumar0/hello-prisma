/*
  Warnings:

  - The values [Unknown] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Draft', 'InProgress', 'InReview', 'Published');
ALTER TABLE "public"."Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'Draft';
COMMIT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ALTER COLUMN "status" SET DEFAULT 'Draft';
