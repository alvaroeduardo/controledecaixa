import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, useDisclosure } from "@chakra-ui/react";
import { formatarNumeroParaReais } from "../../Utils/realTemplate";
import { formatarData } from "../../Utils/dataTemplate";
import { caixa } from "../../Utils/requisicoes";
import { calcularDiferencaMovimentacao } from "../../Utils/calcularTransacoes";
import { Navigate } from "react-router-dom";

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

export function Movimentacao(caixaUnico: CaixaUnico) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function FecharCaixa(id: number, saldoFinal: number, caixaFechado: boolean) {
        await caixa.fecharCaixa(id, saldoFinal, caixaFechado)
        
        return <Navigate to="/" />
    }

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
                    Movimentação
                </Heading>
            </CardHeader>

            <CardBody>
                {
                    caixaUnico ? (
                        caixaUnico.Transacao.map((transacao: Transacao) => (

                            <Stat
                                mb='32px'
                            >
                                <StatLabel>{transacao.descricao}</StatLabel>
                                <StatNumber>{formatarNumeroParaReais(transacao.valor)}</StatNumber>
                                <StatHelpText>{formatarData(transacao.dataDaTransacao)}</StatHelpText>
                                {
                                    transacao.tipoMovimentacao ? (
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                            Entrada
                                        </StatHelpText>
                                    ) : (
                                        <StatHelpText>
                                            <StatArrow type='decrease' />
                                            Saída
                                        </StatHelpText>
                                    )
                                }
                            </Stat>
                        ))
                    ) : (
                        <></>
                    )
                }

            </CardBody>

            <CardFooter>
                <Button w='100%' onClick={onOpen}>Fechar Caixa</Button>
            </CardFooter>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Fechamento de Caixa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Você tem certeza que quer fechar o caixa?

                        <Button w='100%' onClick={() => FecharCaixa(
                            caixaUnico.id,
                            calcularDiferencaMovimentacao(caixaUnico.Transacao),
                            true
                        )}>Fechar Caixa</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Sair</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    )
}