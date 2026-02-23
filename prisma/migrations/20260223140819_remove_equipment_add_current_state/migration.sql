/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "timestamp",
DROP COLUMN "userId",
ADD COLUMN     "timestampClient" TIMESTAMP(3),
ADD COLUMN     "timestampServer" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Equipment";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "CurrentState" (
    "equipmentId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "lastChangedAt" TIMESTAMP(3) NOT NULL,
    "lastEventId" TEXT NOT NULL,

    CONSTRAINT "CurrentState_pkey" PRIMARY KEY ("equipmentId")
);
