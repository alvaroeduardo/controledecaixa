-- CreateTable
CREATE TABLE "Caixa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idResponsavelAbertura" INTEGER NOT NULL,
    "dataDeAbertura" DATETIME NOT NULL,
    "saldoInicial" REAL NOT NULL,
    "saldoFinal" REAL,
    "caixaFechado" BOOLEAN NOT NULL DEFAULT false,
    "dataFechamento" DATETIME,
    CONSTRAINT "Caixa_idResponsavelAbertura_fkey" FOREIGN KEY ("idResponsavelAbertura") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CategoriaTransacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MeioDePagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCaixa" INTEGER NOT NULL,
    "idResponsavelTransacao" INTEGER NOT NULL,
    "nomeDoCliente" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "idMeioDePagamento" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "dataDaTransacao" DATETIME NOT NULL,
    CONSTRAINT "Transacao_idCaixa_fkey" FOREIGN KEY ("idCaixa") REFERENCES "Caixa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idResponsavelTransacao_fkey" FOREIGN KEY ("idResponsavelTransacao") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaTransacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idMeioDePagamento_fkey" FOREIGN KEY ("idMeioDePagamento") REFERENCES "MeioDePagamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
