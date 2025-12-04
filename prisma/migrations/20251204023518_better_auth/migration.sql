/*
  Warnings:

  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `session` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_session_id_fkey";

-- DropIndex
DROP INDEX "session_refresh_token_key";

-- DropIndex
DROP INDEX "user_session_id_idx";

-- AlterTable
ALTER TABLE "session" DROP CONSTRAINT "session_pkey",
DROP COLUMN "created_at",
DROP COLUMN "exp",
DROP COLUMN "refresh_token",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "created_at",
DROP COLUMN "session_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
