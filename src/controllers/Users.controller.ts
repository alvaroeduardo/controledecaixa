import { Request, Response } from 'express'
import * as z from 'zod'
import { prisma } from '../utils/prisma'

export const usuarioController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const usuarios = await prisma.user.findMany()

            return res.status(200).json(usuarios)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todos os usuários do sistema. Contate o time de desenvolvimento.",
                erro: error
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

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (user === null) return res.status(400).json({
                mensagem: "Usuário não encontrado, favor verifique o ID informado."
            })

            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar os dados do usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async criarUmNovoUsuario(req: Request, res: Response) {
        try {
            const bodyParser = z.object({
                nome: z.string(),
                cpf: z.string(),
                cargo: z.string()
            })

            const dadosDoUsuario = bodyParser.parse(req.body)

            const buscaUsuarioPorCpf = await prisma.user.findFirst({
                where: {
                    cpf: dadosDoUsuario.cpf
                }
            })

            if(buscaUsuarioPorCpf !== null) return res.status(400).json({
                mensagem: "CPF já cadastrado.",
                buscaUsuarioPorCpf
            })

            const novoUsuario = await prisma.user.create({
                data: dadosDoUsuario
            })

            return res.status(200).json(novoUsuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível criar um novo usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async atualizarUsuarioExistente(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const bodyParser = z.object({
                nome: z.string(),
                cpf: z.string(),
                cargo: z.string()
            })

            const dadosDoUsuario = bodyParser.parse(req.body)

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (user === null) return res.status(400).json({
                mensagem: "Usuário não encontrado, favor verifique o ID informado."
            })

            await prisma.user.update({
                where: {
                    id: user.id
                },

                data: dadosDoUsuario
            })

            return res.status(200).json({
                mensagem: "Dados atualizados com sucesso."
            })

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar o usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async deletarUsuarioExistente(req: Request, res: Response) {
        try {
            if (!req.params['id']) return res.status(400).json({
                mensagem: "Informe um id..."
            })

            const paramsSchema = z.object({
                id: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (user === null) return res.status(400).json({
                mensagem: "Usuário não encontrado, favor verifique o ID informado."
            })

            await prisma.user.delete({
                where: {
                    id: user.id
                }
            })

            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso."
            })
        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar o usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },
}