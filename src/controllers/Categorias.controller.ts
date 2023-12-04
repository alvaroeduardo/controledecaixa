import { Request, Response } from 'express'
import * as z from 'zod'
import { prisma } from '../utils/prisma'

export const categoriaController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const categorias = await prisma.categoriaTransacao.findMany()

            return res.status(200).json(categorias)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todas as categorias de transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async encontrarSomentoUm(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const categoria = await prisma.categoriaTransacao.findUnique({
                where: {
                    id: parseInt(id)
                },

                include: {
                    Transacao: true
                }
            })

            if (categoria === null) return res.status(400).json({
                mensagem: "Categoria de transação não encontrada, verifique o id informado."
            })

            return res.status(200).json(categoria)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar a categoria de transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async criarNovaCategoriaDeTransacao(req: Request, res: Response) {
        try {
            const bodyParser = z.object({
                titulo: z.string()
            })

            const dadosDaCategoriaDeTransacao = bodyParser.parse(req.body)

            const categoriaDeTransacaoExistente = await prisma.categoriaTransacao.findFirst({
                where: {
                    titulo: dadosDaCategoriaDeTransacao.titulo
                }
            })

            if (categoriaDeTransacaoExistente) return res.status(400).json({
                mensagem: "Categoria de Transação existente.",
                categoriaDeTransacaoExistente
            })

            const categoria = await prisma.categoriaTransacao.create({
                data: dadosDaCategoriaDeTransacao
            })

            return res.status(200).json(categoria)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível criar a nova categoria de transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async atualizarCategoriaDeTransacao(req: Request, res: Response) {
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

            const dadosDaCategoriaDeTransacao = bodyParser.parse(req.body)

            const categoria = await prisma.categoriaTransacao.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (categoria === null) return res.status(400).json({
                mensagem: "Categoria de Transação não encontrada, verifique o id informado."
            })

            await prisma.categoriaTransacao.update({
                where: {
                    id: parseInt(id)
                },

                data: dadosDaCategoriaDeTransacao
            })

            return res.status(200).json({
                mensagem: "Categoria de Transação atualizada com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar a categoria de transação. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async deletarCategoriaDeTransacao(req: Request, res: Response){
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const categoria = await prisma.categoriaTransacao.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (categoria === null) return res.status(400).json({
                mensagem: "Categoria de transação não encontrada, verifique o id informado."
            })

            await prisma.categoriaTransacao.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(200).json({
                mensagem: "Categoria de Transação deletada com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar a categoria de transação. Contate o time de desenvolvimento",
                error
            })
        }
    }
}