const express = require('express')
const mongoose = require('mongoose')
require('../../models/Categorias')
const Categoria = mongoose.model('categorias')

exports.home = (req,res)=>{
 res.render('admin/dashboard', { layout: 'admin-layout' })
}


exports.categorias = (req,res)=>{
 res.render('admin/categorias', { layout: 'admin-layout' })
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
      const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
      }
      new Categoria(novaCategoria).save().then(()=>{
        console.log('Categoria salva')
      }).catch((error)=>{
        console.log('Erro ao salvar categoria')
      })
 }

