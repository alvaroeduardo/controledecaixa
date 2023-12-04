import { Request, Response } from 'express'
import * as z from 'zod'
import { prisma } from '../utils/prisma'

export const meioDePagamentoController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const meiosDePagamento = await prisma.meioDePagamento.findMany()

            return res.status(200).json(meiosDePagamento)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todos os meios de pagamento. Contate o time de desenvolvimento",
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

            const meioDePagamento = await prisma.meioDePagamento.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    Transacao: true
                }
            })

            if (meioDePagamento === null) return res.status(400).json({
                mensagem: "Meio de Pagamento inexistente, verifique o id informado."
            })

            return res.status(200).json(meioDePagamento)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar o meio de pagamento. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async criarUmNovoMeioDePagamento(req: Request, res: Response) {
        try {
            const bodyParser = z.object({
                titulo: z.string()
            })

            const dadosDoMeioDePagamento = bodyParser.parse(req.body)

            const meioDePagamentoExistente = await prisma.meioDePagamento.findFirst({
                where: {
                    titulo: dadosDoMeioDePagamento.titulo
                }
            })

            if (meioDePagamentoExistente) return res.status(400).json({
                mensagem: "Meio de pagamento já existente.",
                meioDePagamentoExistente
            })

            const meioDePagamento = await prisma.meioDePagamento.create({
                data: dadosDoMeioDePagamento
            })

            return res.status(200).json(meioDePagamento)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível criar o meio de pagamento. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async atualizarMeioDePagamento(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const bodyParser = z.object({
                titulo: z.string()
            })

            const dadosDoMeioDePagamento = bodyParser.parse(req.body)

            const meioDePagamento = await prisma.meioDePagamento.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(meioDePagamento === null) return res.status(400).json({
                mensagem: "Meio de pagamento não encontrado, verifique o id informado."
            })

            await prisma.meioDePagamento.update({
                where: {
                    id: meioDePagamento.id
                },

                data: dadosDoMeioDePagamento
            })

            return res.status(200).json({
                mensagem: "Meio de Pagamento atualizado com sucesso!"
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar o meio de pagamento. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async deletarMeioDePagamento(req: Request, res: Response){
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const meioDePagamento = await prisma.meioDePagamento.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(meioDePagamento === null) return res.status(400).json({
                mensagem: "Meio de pagamento não encontrado, verifique o id informado."
            })

            await prisma.meioDePagamento.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(200).json({
                mensagem: "Meio de Pagamento deletado com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar o meio de pagamento. Contate o time de desenvolvimento",
                error
            })
        }
    }
}