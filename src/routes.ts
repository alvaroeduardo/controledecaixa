import { Router } from 'express'

import { usuarioController } from './controllers/Users.controller'

const route = Router()

// Rotas de Usuário
route.get('/usuarios', usuarioController.encontrarTodos)
route.get('/usuarios/:id', usuarioController.encontrarSomenteUm)
route.post('/usuarios', usuarioController.criarUmNovoUsuario)
route.put('/usuarios/:id', usuarioController.atualizarUsuarioExistente)
route.delete('/usuarios/:id', usuarioController.deletarUsuarioExistente)


export default route