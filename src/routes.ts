import { Router } from 'express'

import { usuarioController } from './controllers/Users.controller'
import { caixaController } from './controllers/Caixas.controller'
import { meioDePagamentoController } from './controllers/MeiosDePagamento.controller'
import { categoriaController } from './controllers/Categorias.controller'
import { transacaoController } from './controllers/Transacoes.controller'

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

// Rotas do Meio de Pagamento
route.get('/meiosdepagamento', meioDePagamentoController.encontrarTodos)
route.get('/meiosdepagamento/:id', meioDePagamentoController.encontrarSomenteUm)
route.post('/meiosdepagamento', meioDePagamentoController.criarUmNovoMeioDePagamento)
route.put('/meiosdepagamento/:id', meioDePagamentoController.atualizarMeioDePagamento)
route.delete('/meiosdepagamento/:id', meioDePagamentoController.deletarMeioDePagamento)

// Rotas da Categoria de Transação
route.get('/categoriadetransacao', categoriaController.encontrarTodos)
route.get('/categoriadetransacao/:id', categoriaController.encontrarSomentoUm)
route.post('/categoriadetransacao', categoriaController.criarNovaCategoriaDeTransacao)
route.put('/categoriadetransacao/:id', categoriaController.atualizarCategoriaDeTransacao)
route.delete('/categoriadetransacao/:id', categoriaController.deletarCategoriaDeTransacao)

// Rotas de Transação
route.get('/transacao', transacaoController.encontrarTodos)
route.get('/transacao/:id', transacaoController.encontrarSomenteUm)
route.post('/transacao', transacaoController.criarTransacao)
route.put('/transacao/:id', transacaoController.atualizarTransacao)
route.delete('/transacao/:id', transacaoController.deletarTransacao)

export default route