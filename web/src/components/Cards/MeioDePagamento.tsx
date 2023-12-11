import { Card, CardBody, CardFooter, CardHeader, Divider, Heading, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { formatarNumeroParaReais } from "../../Utils/realTemplate";
import { calcularEntradas, separarPorMeioDePagamento } from "../../Utils/calcularTransacoes";
import { useEffect, useState } from "react";

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

export function MeioDePagamento(caixa: CaixaUnico) {
    const [meiosDePagamentos, setMeiosDePagamentos] = useState<MeioDePagamento[]>()

    useEffect(() => {
        async function fetchData() {
            const mdp = await separarPorMeioDePagamento(caixa.Transacao)

            setMeiosDePagamentos(mdp)
        }

        fetchData()
    }, [meiosDePagamentos])

    return (
        <Card
            flex='1'
            padding='1rem'
            border='1.5px solid #d3d3d3'
            borderRadius='.5rem'
            maxH='80vh'
            overflow='auto'
        >
            <CardHeader>
                <Heading as='h4' size='md'>
                    Meio de Pagamento
                </Heading>
            </CardHeader>

            <CardBody>

                {
                    meiosDePagamentos ? (
                        meiosDePagamentos.map((mdp) => (

                            <>
                                <Stat>
                                    <StatLabel>{mdp.mdp.titulo}</StatLabel>
                                    <StatNumber>{formatarNumeroParaReais(calcularEntradas(mdp.mdp.Transacao))}</StatNumber>
                                </Stat>

                                <Divider />
                            </>
                        ))
                    ) : (
                        <></>
                    )
                }

            </CardBody>

            <CardFooter>
                <Text w='100%' textAlign='right' fontWeight='bold'>Total: {formatarNumeroParaReais(calcularEntradas(caixa.Transacao))}</Text>
            </CardFooter>
        </Card>
    )
}