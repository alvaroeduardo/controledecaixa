import { useEffect, useState } from "react"
import { caixa } from "../Utils/requisicoes"
import { Box, Button } from "@chakra-ui/react"
import { ResumoDoCaixa } from "../components/Cards/ResumoDoCaixa";
import { Movimentacao } from "../components/Cards/Movimentacao";
import { MeioDePagamento } from "../components/Cards/MeioDePagamento";

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

interface Caixa {
    caixaFechado: boolean;
    dataDeAbertura: string;
    dataFechamento: string | null;
    id: number;
    idResponsavelAbertura: number;
    saldoFinal: number | null;
    saldoInicial: number;
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

function CaixaAtual() {
    const [usarCaixa, setCaixa] = useState<CaixaUnico | null>()

    useEffect(() => {
        async function fetchData() {

            const caixas: Caixa[] | null = await caixa.encontrarTodos()
            const caixaAtual = caixas.find((caixa) => caixa.caixaFechado === false)

            const pegarCaixa: CaixaUnico = await caixa.encontrarSomenteUm(caixaAtual?.id!)
            setCaixa(pegarCaixa)
        }
        fetchData()
    }, [usarCaixa])

    return (
        usarCaixa ? (
            <Box
                display='flex'
                flexDir='row'
                justifyContent='space-around'
                gap='8px'
            >
                <ResumoDoCaixa {...usarCaixa}/>

                <MeioDePagamento {...usarCaixa}/>

                <Movimentacao {...usarCaixa}/>
            </Box>
        ) : (
            <Box
                display='flex'
                flexDir='row'
                justifyContent='space-around'
            >
                <Button w='100%'>Abrir novo Caixa</Button>
            </Box>
        )
    )
}

export default CaixaAtual