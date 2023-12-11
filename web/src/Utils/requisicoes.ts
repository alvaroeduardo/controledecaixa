import api from "./axios";

interface Caixa {
    caixaFechado: boolean;
    dataDeAbertura: string;
    dataFechamento: string | null;
    id: number;
    idResponsavelAbertura: number;
    saldoFinal: number | null;
    saldoInicial: number
}

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

interface ResponsavelAbertura {
    id: number;
    nome: string;
    cpf: string;
    cargo: string;
}

interface CaixaUnico {
    caixaFechado: boolean;
    dataDeAbertura: string;
    dataFechamento: string | null;
    id: number;
    idResponsavelAbertura: number;
    saldoFinal: number | null;
    saldoInicial: number;
    Transacao: Transacao[];
    responsavelAbertura: ResponsavelAbertura;
}

interface Categoria {
    id: number;
    titulo: string;
}


interface NovaTransacao {
    idCaixa: number;
    idResponsavelTransacao: number;
    nomeDoCliente: string;
    descricao: string;
    idCategoria: number;
    idMeioDePagamento: number;
    valor: number;
    dataDaTransacao: Date;
    tipoMovimentacao: boolean
}

export const caixa = {
    async encontrarTodos(): Promise<Caixa[]>{
        const caixas = await api.get('/caixas')
        
        return caixas.data
    },

    async encontrarSomenteUm(id: number): Promise<CaixaUnico>{
        const caixas = await api.get(`/caixas/${id}`)

        return caixas.data
    },

    async fecharCaixa(id: number, saldoFinal: number, caixaFechado: boolean){
        const caixa = await api.put(`/caixas/${id}`, {
            saldoFinal,
            caixaFechado
        })
        
        return caixa.data
    }
}

export const categoria = {
    async encontrarTodos(): Promise<Categoria[]>{
        const categorias = await api.get('/categoriadetransacao')

        return categorias.data
    }
}

export const meioDePagamento = {
    async encontrarTodos(): Promise<Categoria[]>{
        const meiosDePagamentos = await api.get('/meiosdepagamento')

        return meiosDePagamentos.data
    },

    async encontrarSomenteUm(id: number): Promise<Categoria>{
        const meioDePagamento = await api.get(`/meiosdepagamento/${id}`)

        return meioDePagamento.data
    }
}

export const transacao = {
    async inserirNovaTransacao(data: NovaTransacao){
        const transacao = await api.post('/transacao', data)

        return transacao.data
    }
}