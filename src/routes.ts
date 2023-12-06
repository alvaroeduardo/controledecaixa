import { Router } from 'express'

import { usuarioController } from './controllers/Users.controller'
import { caixaController } from './controllers/Caixas.controller'
import { meioDePagamentoController } from './controllers/MeiosDePagamento.controller'
import { categoriaController } from './controllers/Categorias.controller'
import { transacaoController } from './controllers/Transacoes.controller'

import { Autenticacao } from './middlewares/Autenticacao'

const route = Router()

// Rotas de Usuário
route.get('/usuarios', Autenticacao, usuarioController.encontrarTodos)
route.get('/usuarios/:id', Autenticacao, usuarioController.encontrarSomenteUm)
route.post('/usuarios', Autenticacao, usuarioController.criarUmNovoUsuario)
route.put('/usuarios/:id', Autenticacao, usuarioController.atualizarUsuarioExistente)
route.delete('/usuarios/:id', Autenticacao, usuarioController.deletarUsuarioExistente)
route.post('/usuarios/login', usuarioController.login)

// Rotas do Caixa
route.get('/caixas', Autenticacao, caixaController.encontrarTodos)
route.get('/caixas/:id', Autenticacao, caixaController.encontrarSomenteUm)
route.post('/caixas', Autenticacao, caixaController.criarUmNovoCaixa)
route.put('/caixas/:id', Autenticacao, caixaController.atualizarDadosDoCaixa)
route.delete('/caixas/:id', Autenticacao, caixaController.deletarCaixa)

// Rotas do Meio de Pagamento
route.get('/meiosdepagamento', Autenticacao, meioDePagamentoController.encontrarTodos)
route.get('/meiosdepagamento/:id', Autenticacao, meioDePagamentoController.encontrarSomenteUm)
route.post('/meiosdepagamento', Autenticacao, meioDePagamentoController.criarUmNovoMeioDePagamento)
route.put('/meiosdepagamento/:id', Autenticacao, meioDePagamentoController.atualizarMeioDePagamento)
route.delete('/meiosdepagamento/:id', Autenticacao, meioDePagamentoController.deletarMeioDePagamento)

// Rotas da Categoria de Transação
route.get('/categoriadetransacao', Autenticacao, categoriaController.encontrarTodos)
route.get('/categoriadetransacao/:id', Autenticacao, categoriaController.encontrarSomentoUm)
route.post('/categoriadetransacao', Autenticacao, categoriaController.criarNovaCategoriaDeTransacao)
route.put('/categoriadetransacao/:id', Autenticacao, categoriaController.atualizarCategoriaDeTransacao)
route.delete('/categoriadetransacao/:id', Autenticacao, categoriaController.deletarCategoriaDeTransacao)

// Rotas de Transação
route.get('/transacao', Autenticacao, transacaoController.encontrarTodos)
route.get('/transacao/:id', Autenticacao, transacaoController.encontrarSomenteUm)
route.post('/transacao', Autenticacao, transacaoController.criarTransacao)
route.put('/transacao/:id', Autenticacao, transacaoController.atualizarTransacao)
route.delete('/transacao/:id', Autenticacao, transacaoController.deletarTransacao)

export default route