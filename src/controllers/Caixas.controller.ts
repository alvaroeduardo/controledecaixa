import { Request, Response } from 'express'
import * as z from 'zod'
import { prisma } from '../utils/prisma'

export const caixaController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const caixas = await prisma.caixa.findMany()

            return res.status(200).json(caixas)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todos os caixas. Contate o time de desenvolvimento",
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

            const caixa = await prisma.caixa.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    responsavelAbertura: true,
                    Transacao: true
                }
            })

            if (caixa === null) return res.status(400).json({
                mensagem: "Caixa inexistente, verifique o id informado."
            })

            return res.status(200).json(caixa)
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível os dados do caixa. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async criarUmNovoCaixa(req: Request, res: Response) {
        try {
            const bodyParser = z.object({
                idResponsavelAbertura: z.number(),
                dataDeAbertura: z.date().default(new Date()),
                saldoInicial: z.number(),
            })

            const dadosDoCaixa = bodyParser.parse(req.body)

            const caixaAberto = await prisma.caixa.findFirst({
                where: {
                    caixaFechado: false
                }
            })

            if (caixaAberto) return res.status(400).json({
                mensagem: "Já existe um caixa aberto. Para realizar abertura de outro é necessário que você realize o fechamento do anterior.",
                caixaAberto
            })

            const responsavelExistente = await prisma.user.findUnique({
                where: {
                    id: dadosDoCaixa.idResponsavelAbertura
                }
            })

            if(responsavelExistente === null) return res.status(400).json({
                mensagem: "Usuário inexistente..."
            })

            const caixa = await prisma.caixa.create({
                data: dadosDoCaixa
            })

            return res.status(200).json({
                mensagem: "Caixa aberto com sucesso!",
                caixa
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível abrir um novo caixa. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async atualizarDadosDoCaixa(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const bodyParser = z.object({
                saldoFinal: z.number(),
                caixaFechado: z.boolean(),
                dataFechamento: z.date().default(new Date)
            })

            const dadosDoCaixa = bodyParser.parse(req.body)

            const caixa = await prisma.caixa.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(caixa === null) return res.status(400).json({
                mensagem: "Caixa inexistente, verifique o id informado."
            })

            await prisma.caixa.update({
                where: {
                    id: caixa.id
                },

                data: dadosDoCaixa
            })

            return res.status(200).json({
                mensagem: "Caixa atualizado com sucesso!"
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar os dados do caixa. Contate o time de desenvolvimento",
                error
            })
        }
    },

    async deletarCaixa(req: Request, res: Response){
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const caixa = await prisma.caixa.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(caixa === null) return res.status(400).json({
                mensagem: "Caixa inexistente, verifique o id informado."
            })

            await prisma.caixa.delete({
                where: {
                    id: caixa.id
                }
            })

            return res.status(200).json({
                mensagem: "Caixa excluído com sucesso!"
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar o caixa. Contate o time de desenvolvimento",
                error
            })
        }
    }
}