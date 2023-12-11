/*
  Warnings:

  - Added the required column `tipoMovimentacao` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCaixa" INTEGER NOT NULL,
    "idResponsavelTransacao" INTEGER NOT NULL,
    "nomeDoCliente" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "idMeioDePagamento" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "dataDaTransacao" DATETIME NOT NULL,
    "tipoMovimentacao" BOOLEAN NOT NULL,
    CONSTRAINT "Transacao_idCaixa_fkey" FOREIGN KEY ("idCaixa") REFERENCES "Caixa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idResponsavelTransacao_fkey" FOREIGN KEY ("idResponsavelTransacao") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaTransacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idMeioDePagamento_fkey" FOREIGN KEY ("idMeioDePagamento") REFERENCES "MeioDePagamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("dataDaTransacao", "descricao", "id", "idCaixa", "idCategoria", "idMeioDePagamento", "idResponsavelTransacao", "nomeDoCliente", "valor") SELECT "dataDaTransacao", "descricao", "id", "idCaixa", "idCategoria", "idMeioDePagamento", "idResponsavelTransacao", "nomeDoCliente", "valor" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
