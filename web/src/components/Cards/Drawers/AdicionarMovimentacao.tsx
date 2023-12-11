import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Text, Select, Stack, Switch, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { categoria, meioDePagamento, transacao } from "../../../Utils/requisicoes";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface AdicionarMovimentacaoProps {
    isOpen: boolean;
    onClose: () => void;
    idCaixa: number;
}

interface Categoria {
    id: number;
    titulo: string;
}

type Inputs = {
    nomeDoCliente: string;
    descricao: string;
    idCategoria: number;
    idMeioDePagamento: number;
    valor: number;
    dataDaTransacao: Date;
    tipoMovimentacao: boolean
}

export const AdicionarMovimentacao: React.FC<AdicionarMovimentacaoProps> = ({ isOpen, onClose, idCaixa }) => {
    const {getUser} = useAuth()
    const [categorias, setCategorias] = useState<Categoria[] | null>()
    const [meiosDePagamentos, setMeiosDePagamentos] = useState<Categoria[] | null>()
    const toast = useToast();

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await transacao.inserirNovaTransacao({
            idCaixa: idCaixa,
            idResponsavelTransacao: getUser().id,
            dataDaTransacao: data.dataDaTransacao,
            descricao: data.descricao,
            idCategoria: data.idCategoria,
            idMeioDePagamento: data.idMeioDePagamento,
            nomeDoCliente: data.nomeDoCliente,
            tipoMovimentacao: data.tipoMovimentacao,
            valor: data.valor
        }).then(() => {
            toast({
                title: 'Muito bem!!',
                description: "Transação adicionada com sucesso!",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true
            });

            <Navigate to="/" />
        }).catch((error) => {
            toast({
                title: 'Ops...',
                description: "Não foi possível adicionar transação...",
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true
            });
            console.log(error)
        })
    }

    useEffect(() => {
        async function fetchData() {
            const categorias = await categoria.encontrarTodos()
            const meiosDePagamentos = await meioDePagamento.encontrarTodos()

            setCategorias(categorias)
            setMeiosDePagamentos(meiosDePagamentos)
        }

        fetchData()
    }, [idCaixa])

    return (

        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Adicionar Movimentação</DrawerHeader>

                <DrawerBody>

                    <Text mb='8px'>Nome do Cliente:</Text>
                    <Input
                        placeholder='Insira o nome do cliente'
                        size='sm'
                        mb='16px'
                        {...register("nomeDoCliente")}
                    />

                    <Text mb='8px'>Descrição:</Text>
                    <Input
                        placeholder='Descreva o tipo de serviço.'
                        size='sm'
                        mb='16px'
                        {...register("descricao")}
                    />

                    <Text mb='8px'>Categoria:</Text>
                    <Select
                        placeholder='Escolha uma Categoria:'
                        size='sm'
                        mb='16px'
                        {...register("idCategoria")}
                    >
                        {
                            categorias?.map((categoria, index) => {
                                return (
                                    <option key={index} value={categoria.id}>{categoria.titulo}</option>
                                )
                            })
                        }
                    </Select>

                    <Text mb='8px'>Meios de Pagamento:</Text>
                    <Select
                        placeholder='Escolha um meio de Pagamento:'
                        size='sm'
                        mb='16px'
                        {...register("idMeioDePagamento")}
                    >
                        {
                            meiosDePagamentos?.map((meio, index) => {
                                return (
                                    <option key={index} value={meio.id}>{meio.titulo}</option>
                                )
                            })
                        }
                    </Select>

                    <Text mb='8px'>Data da Transação:</Text>
                    <Input
                        placeholder='Selecione a data.'
                        size='sm'
                        mb='16px'
                        type="datetime-local"
                        {...register("dataDaTransacao")}
                    />

                    <Text mb='8px'>Valor:</Text>
                    <Input
                        placeholder='Insira o valor da transação.'
                        size='sm'
                        mb='16px'
                        {...register("valor")}
                    />

                    <Text mb='8px'>Tipo da Transação:</Text>
                    <Stack align='center' direction='row'>
                        <Text>Saída</Text>
                        <Switch size='md' {...register("tipoMovimentacao")} />
                        <Text>Entrada</Text>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue' type="submit" onClick={handleSubmit(onSubmit)}>Adicionar</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}