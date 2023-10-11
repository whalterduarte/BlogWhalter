const express = require('express')
const mongoose = require('mongoose')
require('../../models/Categorias')
const Categoria = mongoose.model('categorias')


                        /*CONTROLLER 
                             DAS
                          CATEGORIAS*/

//Home do painel
exports.home = (req,res)=>{
 res.render('admin/dashboard', { layout: 'admin-layout' })
}

//Home da categoria
exports.categorias = (req,res)=>{
  Categoria.find().sort({date: 'desc'}).lean().then((categorias)=>{
    res.render('admin/categorias', { layout: 'admin-layout', categorias: categorias })
  }).catch((error)=>{
    req.flash('error_msg', 'Ouve um erro ao listar categorias')
    res.redirect('/admin')
  })

}

//Pagina de adição 
exports.adicionar = (req,res)=>{
  res.render('admin/addcategorias', { layout: 'admin-layout' })
 }
 
//Adiciona a categoria
 exports.adcCategoria = (req,res)=>{

      var erros = []

      if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null  ){
          erros.push({texto: "Nome inválido"})
      }

      if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ){
          erros.push({texto: "Slug inválido"})
      }
      if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria muito pequeno"})
      }
      if (erros.length > 0) {
        res.render('admin/addcategorias', { layout: 'admin-layout', erros: erros })
      }else{
        const novaCategoria = {
          nome: req.body.nome,
          slug: req.body.slug
          }
          new Categoria(novaCategoria).save().then(()=>{
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('../')
          }).catch((error)=>{
            req.flash('error_msg', 'Erro ao criar categoria, tente novamente !')
            res.redirect('admin/categorias')
          })
     }
      }

//Exibe o conteudo da categoria no input
 exports.editarCategoria = (req,res)=>{
      Categoria.findOne({_id: req.params.id}).lean().then((categoria)=>{
        res.render('admin/editarcategorias', { layout: 'admin-layout', categoria: categoria})
      }).catch((error)=>{
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('../')
      })
 }

//Edita categoria
 exports.editCategoria = (req, res)=>{
  Categoria.findOne({_id: req.body.id}).then((categoria)=>{

    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(()=>{
      req.flash('success_msg', 'Categoria editado com sucesso!')
      res.redirect('./')
    }).catch((error)=>{
      req.flash('error_msg', 'Houve um erro interno ao salvar a edição da categoria!')
      res.send('./')
    })

  }).catch((error)=>{
    req.flash('error_msg', 'Houve um erro ao editar a categoria!')
    res.redirect('./')
  })
}

//Deleta categoria
exports.deletar = (req,res)=>{
  Categoria.deleteOne({_id : req.body.id}).then(()=>{
    req.flash('success_msg', 'Categoria deletada com sucesso!')
    res.redirect('./')
  }).catch((error)=>{
    req.flash('error_msg', 'Houve um erro ao deletar a categoria')
    res.redirect('./')
  })
}