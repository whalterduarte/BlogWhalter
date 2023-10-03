const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const admin = require('./src/routes/admin')

//Dot env e port
require('dotenv').config()
const port = process.env.PORT

//Configurações
    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //Handlebars
    const handlebars = exphbs.create({ })
    app.engine('handlebars', handlebars.engine )
    app.set('view engine', 'handlebars' )
    app.set('views', path.join(__dirname, 'src/views'))
    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb+srv://blogWhalter:1234@cluster0.9w12ozh.mongodb.net/?retryWrites=true&w=majority").then(()=>{
      console.log('Connectado com o MongoDB')
    }).catch((error)=>{
      console.log('Erro ao se connectar')
    })

    //Public
  app.use(express.static(path.join(__dirname, "src/public")))

  
//Rotas   
    //Admin
        app.use('/admin', admin)


 
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))