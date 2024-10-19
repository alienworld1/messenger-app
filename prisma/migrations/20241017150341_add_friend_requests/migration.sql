-- CreateTable
CREATE TABLE "_friend-requests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_friend-requests_AB_unique" ON "_friend-requests"("A", "B");

-- CreateIndex
CREATE INDEX "_friend-requests_B_index" ON "_friend-requests"("B");

-- AddForeignKey
ALTER TABLE "_friend-requests" ADD CONSTRAINT "_friend-requests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friend-requests" ADD CONSTRAINT "_friend-requests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
