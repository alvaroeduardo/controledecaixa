import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { formatarData } from "../../Utils/dataTemplate";
import { formatarNumeroParaReais } from "../../Utils/realTemplate";
import { AdicionarMovimentacao } from "./Drawers/AdicionarMovimentacao";
import { calcularDiferencaMovimentacao } from "../../Utils/calcularTransacoes";

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
    Transacao: Transacao[];
    responsavelAbertura: ResponsavelAbertura;
}

export function ResumoDoCaixa(caixa: Caixa) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const totalDeVendas = formatarNumeroParaReais(calcularDiferencaMovimentacao(caixa.Transacao))

    return (
        <>
            <Card
                padding='1rem'
                border='1.5px solid #d3d3d3'
                borderRadius='.5rem'
                flex='1'
            >
                <CardHeader>
                    <Heading as='h4' size='md'>
                        Resumo do Caixa #{caixa.id}
                    </Heading>

                    <Text fontSize='sm'>Aberto aos {formatarData(caixa.dataDeAbertura)}</Text>
                </CardHeader>

                <CardBody>
                    <Text fontSize='sm'>Saldo Inicial: {formatarNumeroParaReais(caixa.saldoInicial)}</Text>

                    <Text fontSize='sm'>Total de Vendas: {totalDeVendas}</Text>

                    <Text fontSize='sm' fontWeight='bold'>Saldo Final: {formatarNumeroParaReais(caixa.saldoInicial - calcularDiferencaMovimentacao(caixa.Transacao))}</Text>
                </CardBody>

                <CardFooter
                    display='flex'
                    flexDir='row'
                    justifyContent='space-between'
                    gap='8px'
                >
                    <Button
                        colorScheme='gray'
                        variant='outline'
                        onClick={onOpen}
                    >
                        Adicionar Movimento
                    </Button>
                </CardFooter>
            </Card>

            <AdicionarMovimentacao 
                isOpen={isOpen} 
                onClose={onClose} 
                idCaixa={caixa.id}
            />
        </>
    )
}