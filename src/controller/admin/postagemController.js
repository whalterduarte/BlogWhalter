const express = require('express')
const mongoose = require('mongoose')
require('../../models/Categorias')
const Categoria = mongoose.model('categorias')
require('../../models/Postagem')
const Postagem = mongoose.model('postagens')

                        /*CONTROLLER 
                             DAS
                          POSTAGEM*/


//Lista postagem
exports.home = (req, res) =>{
  Postagem.find().populate('categoria').sort({data:'desc'}).lean().then((postagens)=>{
  res.render('admin/postagens', {layout: 'admin-layout', postagens})
  }).catch((err)=>{
    req.flash('error_msg', 'Houve um erro ao listar as postagens')
    res.send('erro ao listar postagens' + err.message)
  })
}

//Formulario de postagem
exports.formPostagem = (req, res) =>{
  Categoria.find().lean().then((categorias)=>{
    res.render('admin/addpostagem', {layout: 'admin-layout', categorias})
  }).catch((err)=>{
    req.flash('error_msg', 'Houve um erro ao carregar o formulario ')
    res.redirect('../')
  })
}

//Adiciona nova postagem
exports.addnovapostagem = (req, res) => {
  let erros = []

  // Valide o campo categoria
  if (!req.body.categoria || !mongoose.Types.ObjectId.isValid(req.body.categoria)) {
    erros.push({ texto: 'Categoria inválida' })
  }
  if (erros.length > 0) {
    res.render('admin/addpostagem', { layout: 'admin-layout', erros: erros })
  } else {
    const novaPostagem = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      categoria: req.body.categoria,
      slug: req.body.slug
    };
    new Postagem(novaPostagem).save()
    .then(() => {
        req.flash('success_msg', 'Postagem adicionada com sucesso!')
        res.redirect('./')})
    .catch((err) => {
        req.flash('error_msg', 'Houve um erro ao adicionar postagem')
        res.redirect('./')
      });
  }
}
