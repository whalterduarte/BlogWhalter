const express = require('express')
const router = express.Router()
const categoriaPainel = require('../controller/admin/categoriaControlle')


//ROTAS GET
router.get('/', categoriaPainel.home)
router.get('/categorias',categoriaPainel.categorias)
router.get('/categorias/adicionar', categoriaPainel.adicionar )
router.get('/categorias/editar/:id', categoriaPainel.editarCategoria)

//ROTAS POST
router.post('/categorias/adicionar/nova', categoriaPainel.adcCategoria)
router.post('/categorias/editar', categoriaPainel.editCategoria)
router.post('/categorias/deletar', categoriaPainel.deletar)


module.exports = router