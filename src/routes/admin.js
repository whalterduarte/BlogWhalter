const express = require('express')
const router = express.Router()
const homePainel = require('../controller/admin/homeController')

router.get('/', homePainel.home )
router.get('/categorias', homePainel.categorias)
router.get('/postagens', homePainel.postagens )
router.get('/usuarios', homePainel.usuarios )
router.get('/configura', homePainel.configura )

router.get('/categorias/adicionar', homePainel.adicionar )

//ROTAS POST
router.post('/categorias/adicionar/nova', homePainel.adcCategoria)


module.exports = router