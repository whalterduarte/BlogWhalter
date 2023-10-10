const express = require('express')
const router = express.Router()
const postagemPainel = require('../controller/admin/postagemController')

//ROTAS GET
router.get('/postagens', postagemPainel.home)
router.get('/postagens/adicionar', postagemPainel.formPostagem)
//ROTA POST
router.post('/postagens/nova', postagemPainel.addnovapostagem)



module.exports = router