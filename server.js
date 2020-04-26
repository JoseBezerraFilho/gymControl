const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()


server.use(express.urlencoded({extended: true}))
server.set('view engine', 'njk') 

server.use(express.static('public')) 
server.use(routes) // middleware

nunjucks.configure('views', {
  express: server,
  noCache: true
}) 


server.listen(3333, function() {
  console.log('servidor em testes')
})

// $ npm install browser-sync npm-run-all -D