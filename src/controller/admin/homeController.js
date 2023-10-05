const express = require('express')
const mongoose = require('mongoose')
require('../../models/Categorias')
const Categoria = mongoose.model('categorias')
require('../../models/Postagem')
const Postagem = mongoose.model('postagens')

exports.home = (req,res)=>{
 res.render('admin/dashboard', { layout: 'admin-layout' })
}

//Postagens
exports.postagens = (req,res)=>{
  Postagem.find().lean().populate('categoria').sort({data:'desc'}).then((postagens)=>{
    res.render('admin/postagens', { layout: 'admin-layout', postagens: postagens })
  }).catch((error)=>{
    req.flash('Houve um erro ao lista as postagens')
   
  })
}

exports.adcPostagem = (req,res)=>{
  Categoria.find().lean().then((categorias)=>{
  res.render('admin/addpostagem', { layout: 'admin-layout', categorias: categorias })
  }).catch((error)=>{
    req.flash('error_msg', 'Houve um error ao carregar o formulario')
    res.redirect('../', {layout: 'admin-layout'})
  })
 }

 exports.novaPostagem = async (req, res) => {
  try {
    const categorias = await Categoria.find().lean()
    var erros = []

    if (req.body.categoria == 0) {
      erros.push({ texto: 'Categoria inválida, registre uma categoria' });
    }

    if (
      !req.body.titulo ||
      !req.body.slug ||
      !req.body.descricao ||
      !req.body.conteudo
    ) {
      erros.push({ texto: 'Preencha todos os campos' })
    } else {
      if (req.body.titulo.length < 5) {
        erros.push({ texto: 'Título muito pequeno' })
      }
      if (req.body.slug.length < 2) {
        erros.push({ texto: 'Slug muito pequeno' })
      }
      if (req.body.descricao.length < 10) {
        erros.push({ texto: 'Descrição muito pequena' })
      }
      if (req.body.conteudo.length < 80) {
        erros.push({ texto: 'Conteúdo muito pequeno' })
      }
    }

    if (erros.length > 0) {
      return res.render('admin/addpostagem', {
        erros: erros,
        categorias: categorias,
        layout: 'admin-layout',
      })
    }

    const novaPostagem = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      categoria: req.body.categoria,
      slug: req.body.slug,
    };

    new Postagem(novaPostagem)
      .save()
      .then(() => {
        req.flash('success_msg', 'Postagem criada com sucesso!')
        res.redirect('./');
      })
      .catch((error) => {
        req.flash(
          'error_msg',
          'Houve um problema ao adicionar a postagem, tente novamente'
        );
        res.redirect('./')
      });
  } catch (error) {
    console.error(error)
    req.flash(
      'error_msg',
      'Houve um problema ao adicionar a postagem, tente novamente'
    );
    res.redirect('./')
  }
};


exports.usuarios = (req,res)=>{
 res.render('admin/usuarios', { layout: 'admin-layout' })
}


exports.configura = (req,res)=>{
 res.render('admin/configura', { layout: 'admin-layout' })
}

exports.adicionar = (req,res)=>{
  res.render('admin/addcategorias', { layout: 'admin-layout' })
 }
 
 //Categorias

 exports.categorias = (req,res)=>{
  Categoria.find().sort({date: 'desc'}).lean().then((categorias)=>{
    res.render('admin/categorias', { layout: 'admin-layout', categorias: categorias })
  }).catch((error)=>{
    req.flash('error_msg', 'Ouve um erro ao listar categorias')
    res.redirect('/admin')
  })
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


 exports.editarCategoria = ((req,res)=>{
      Categoria.findOne({_id: req.params.id}).lean().then((categoria)=>{
        res.render('admin/editarcategorias', { layout: 'admin-layout', categoria: categoria})
      }).catch((error)=>{
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('../')
      })
 })



 exports.editCategoria = ((req, res)=>{
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
})

exports.deletar = ((req,res)=>{
  Categoria.deleteOne({_id : req.body.id}).then(()=>{
    req.flash('success_msg', 'Categoria deletada com sucesso!')
    res.redirect('./')
  }).catch((error)=>{
    req.flash('error_msg', 'Houve um erro ao deletar a categoria')
    res.redirect('./')
  })
})