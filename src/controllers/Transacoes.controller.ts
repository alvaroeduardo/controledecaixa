import { Request, Response } from 'express'
import * as z from 'zod'
import { prisma } from '../utils/prisma'

export const transacaoController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const transacoes = await prisma.transacao.findMany()

            return res.status(200).json(transacoes)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todas as transações. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async encontrarSomenteUm(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const transacao = await prisma.transacao.findUnique({
                where: {
                    id: parseInt(id)
                },

                include: {
                    caixa: true,
                    categoria: true,
                    meioDePagamento: true,
                    responsavelTransacao: true
                }
            })

            if (transacao === null) return res.status(400).json({
                mensagem: "Transação não encontrada. Verifique o id informado."
            })

            return res.status(200).json(transacao)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar os dados da transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async criarTransacao(req: Request, res: Response) {
        try {
            const bodyParser = z.object({
                idCaixa: z.number(),
                idResponsavelTransacao: z.number(),
                nomeDoCliente: z.string(),
                descricao: z.string(),
                idCategoria: z.number(),
                idMeioDePagamento: z.number(),
                valor: z.number(),
                dataDaTransacao: z.date().default(new Date())
            })

            const dadosTransacao = bodyParser.parse(req.body)

            const caixaExistente = await prisma.caixa.findUnique({
                where: {
                    id: dadosTransacao.idCaixa
                }
            })

            const responsavelExistente = await prisma.user.findUnique({
                where: {
                    id: dadosTransacao.idResponsavelTransacao
                }
            })

            const categoriaExistente = await prisma.categoriaTransacao.findUnique({
                where: {
                    id: dadosTransacao.idCategoria
                }
            })

            const meioDePagamentoExistente = await prisma.meioDePagamento.findUnique({
                where: {
                    id: dadosTransacao.idMeioDePagamento
                }
            })

            if ( caixaExistente === null|| responsavelExistente === null || categoriaExistente === null || meioDePagamentoExistente === null) return res.status(400).json({
                mensagem: "Verifique os id's informados."
            })

            const transacao = await prisma.transacao.create({
                data: dadosTransacao
            })

            return res.status(200).json(transacao)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível criar a nova transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async atualizarTransacao(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const bodyParser = z.object({
                nomeDoCliente: z.string(),
                descricao: z.string(),
                idCategoria: z.number(),
                idMeioDePagamento: z.number(),
                valor: z.number(),
            })

            const dadosTransacao = bodyParser.parse(req.body)

            const transacao = await prisma.transacao.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (transacao === null) return res.status(400).json({
                mensagem: "Transação não encontrada. Verifique o id informado."
            })

            const responsavelExistente = await prisma.user.findUnique({
                where: {
                    id: transacao.idResponsavelTransacao
                }
            })

            const categoriaExistente = await prisma.categoriaTransacao.findUnique({
                where: {
                    id: dadosTransacao.idCategoria
                }
            })

            const meioDePagamentoExistente = await prisma.meioDePagamento.findUnique({
                where: {
                    id: dadosTransacao.idMeioDePagamento
                }
            })

            if ( responsavelExistente === null || categoriaExistente === null || meioDePagamentoExistente === null) return res.status(400).json({
                mensagem: "Verifique os id's informados."
            })

            await prisma.transacao.update({
                where: {
                    id: parseInt(id)
                },
                data: dadosTransacao
            })

            return res.status(200).json({
                mensagem: "Dados da transação atualizada com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar a transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async deletarTransacao(req: Request, res: Response){
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const transacao = await prisma.transacao.findUnique({
                where: {
                    id: parseInt(id)
                },
            })

            if (transacao === null) return res.status(400).json({
                mensagem: "Transação não encontrada. Verifique o id informado."
            })

            await prisma.transacao.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(200).json({
                mensagem: "Deletado com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar a transação. Contate o time de desenvolvimento",
                error
            })
        }
    }
}