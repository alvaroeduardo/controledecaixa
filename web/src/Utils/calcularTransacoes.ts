import { meioDePagamento } from "./requisicoes";

interface Transacao {
    id: number;
    idCaixa: number;
    idResponsavelTransacao: number;
    nomeDoCliente: string;
    descricao: string;
    idCategoria: number;
    idMeioDePagamento: number;
    valor: number;
    dataDaTransacao: string;
    tipoMovimentacao: boolean;
}

interface MeioDePagamento {
    idMeioDePagamento: number;
    valor: number;
    mdp: {
        id: number;
        titulo: string;
        Transacao: {
            id: number;
            idCaixa: number;
            idResponsavelTransacao: number;
            nomeDoCliente: string;
            descricao: string;
            idCategoria: number;
            idMeioDePagamento: number;
            valor: number;
            dataDaTransacao: string;
            tipoMovimentacao: boolean;
        }[];
    };
}

// Função para calcular a diferença entre tipos de movimentação
export function calcularDiferencaMovimentacao(transacoes: Transacao[]) {
    let saldo = 0;

    // Iterar sobre as transações
    for (const transacao of transacoes) {
        // Verificar o tipo de movimentação
        if (transacao.tipoMovimentacao) {
            // Se for true, adicionar ao saldo
            saldo += transacao.valor;
        } else {
            // Se for false, subtrair do saldo
            saldo -= transacao.valor;
        }
    }

    // Retornar o saldo final
    return saldo;
}

export function calcularEntradas(transacoes: Transacao[]) {
    let totalEntradas = 0;

    // Iterar sobre as transações
    for (const transacao of transacoes) {
        // Verificar se é uma entrada (tipoMovimentacao é true)
        if (transacao.tipoMovimentacao) {
            // Adicionar ao total de entradas
            totalEntradas += transacao.valor;
        }
    }

    // Retornar o total de entradas
    return totalEntradas;
}

export async function separarPorMeioDePagamento(transacoes: Transacao[]): Promise<MeioDePagamento[]> {
    const resultado: any = {};

    // Iterar sobre as transações
    for (const transacao of transacoes) {
        // Verificar se o idMeioDePagamento já existe no resultado
        if (resultado.hasOwnProperty(transacao.idMeioDePagamento)) {
            // Se existir, adicionar o valor ao idMeioDePagamento correspondente
            resultado[transacao.idMeioDePagamento].valor += transacao.valor;
        } else {
            // Se não existir, encontrar os dados do meio de pagamento
            const mdp = await meioDePagamento.encontrarSomenteUm(transacao.idMeioDePagamento);

            // Adicionar ao resultado com os dados do meio de pagamento
            resultado[transacao.idMeioDePagamento] = {
                idMeioDePagamento: transacao.idMeioDePagamento,
                valor: transacao.valor,
                mdp,
            };
        }
    }

    // Converter o objeto em um array de objetos
    const resultadoArray: MeioDePagamento[] = Object.values(resultado);

    // Retornar o array resultante
    return resultadoArray;
}