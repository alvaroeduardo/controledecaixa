import { Request, Response } from 'express'

import CRUDService from '../utils/CRUD'
import { User } from '@prisma/client'
import { prisma } from '../utils/prisma'

const userService = new CRUDService<User>(prisma, 'user')

export const usuarioController = {
    async encontrarTodos(req: Request, res: Response) {
        try {
            const novoUsuario = await userService.getAll()

            res.status(201).json(novoUsuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar todos os usuários do sistema. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async encontrarSomenteUm(req: Request, res: Response) {
        try {

            const usuario = await userService.read(req.params['id'])

            res.status(200).json(usuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível retornar os dados do usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async criarUmNovoUsuario(req: Request, res: Response){
        try {

            const usuario = await userService.create(req.body)

            res.status(200).json(usuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível criar um novo usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async atualizarUsuarioExistente(req: Request, res: Response){
        try {

            const usuario = await userService.update(req.params['id'], req.body)

            res.status(200).json(usuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível atualizar o usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },

    async deletarUsuarioExistente(req: Request, res: Response){
        try {

            const usuario = await userService.delete(req.params['id'])

            res.status(200).json(usuario)

        } catch (error) {
            return res.status(400).json({
                mensagem: "Não foi possível deletar o usuário. Contate o time de desenvolvimento.",
                erro: error
            })
        }
    },
}