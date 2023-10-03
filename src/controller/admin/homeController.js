const express = require('express')
const mongoose = require('mongoose')
require('../../models/Categorias')
const Categoria = mongoose.model('categorias')



exports.home = (req,res)=>{
 res.render('admin/dashboard', { layout: 'admin-layout' })
}


exports.categorias = (req,res)=>{
  Categoria.find().lean().then((categorias)=>{
    res.render('admin/categorias', { layout: 'admin-layout', categorias: categorias })
  }).catch((error)=>{
    req.flash('error_msg', 'Ouve um erro ao listar categorias')
    res.redirect('/admin')
  })
 

}


exports.postagens = (req,res)=>{
 res.render('admin/postagens', { layout: 'admin-layout' })
}

exports.usuarios = (req,res)=>{
 res.render('admin/usuarios', { layout: 'admin-layout' })
}


exports.configura = (req,res)=>{
 res.render('admin/configura', { layout: 'admin-layout' })
}

exports.adicionar = (req,res)=>{
  res.render('admin/addcategorias', { layout: 'admin-layout' })
 }
 
 

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
        res.render('admin/addcategorias', { layout: 'admin-layout', erros: erros });
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


 

