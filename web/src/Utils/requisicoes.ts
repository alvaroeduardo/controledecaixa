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
export const caixa = {
    async encontrarTodos(): Promise<Caixa[]>{
        const caixas = await api.get('/caixas')
        
        return caixas.data
    }
}