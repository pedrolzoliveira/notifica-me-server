-- CreateTable
CREATE TABLE "_CustomerToPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToPlan_AB_unique" ON "_CustomerToPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToPlan_B_index" ON "_CustomerToPlan"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToPlan" ADD CONSTRAINT "_CustomerToPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPlan" ADD CONSTRAINT "_CustomerToPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
