const express = require('express')
const router = express.Router()
const homePainel = require('../controller/admin/homeController')

router.get('/', homePainel.home )
router.get('/categorias', homePainel.categorias)
router.get('/postagens', homePainel.postagens )
router.get('/usuarios', homePainel.usuarios )
router.get('/configura', homePainel.configura )

router.get('/categorias/adicionar', homePainel.adicionar )
router.get('/categorias/editar/:id', homePainel.editarCategoria)

//ROTAS POST
router.post('/categorias/adicionar/nova', homePainel.adcCategoria)
router.post('/categorias/editar', homePainel.editCategoria)
router.post('/categorias/deletar', homePainel.deletar)


module.exports = router