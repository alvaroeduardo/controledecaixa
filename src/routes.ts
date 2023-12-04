import { Router } from 'express'

import { usuarioController } from './controllers/Users.controller'
import { caixaController } from './controllers/Caixas.controller'

const route = Router()

// Rotas de Usuário
route.get('/usuarios', usuarioController.encontrarTodos)
route.get('/usuarios/:id', usuarioController.encontrarSomenteUm)
route.post('/usuarios', usuarioController.criarUmNovoUsuario)
route.put('/usuarios/:id', usuarioController.atualizarUsuarioExistente)
route.delete('/usuarios/:id', usuarioController.deletarUsuarioExistente)

// Rotas do Caixa
route.get('/caixas', caixaController.encontrarTodos)
route.get('/caixas/:id', caixaController.encontrarSomenteUm)
route.post('/caixas', caixaController.criarUmNovoCaixa)
route.put('/caixas/:id', caixaController.atualizarDadosDoCaixa)
route.delete('/caixas/:id', caixaController.deletarCaixa)

export default route