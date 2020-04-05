// 1. npm init -y
// 2. npm instal express
// 3. criamos a pasta views para armazenar as páginas
// 4. instalamos o template engine ('nunjucks') e importamos

const express = require('express')
const nunjucks = require('nunjucks')
const courses = require('./data-courses')

const server = express()

server.set('view engine', 'njk') // 5. configurando o servidor para 
//usar um template engine

server.use(express.static('public')) // 7. definindo pasta 
// que será monitorada pelo servidor.

nunjucks.configure('views', {
  express: server,
  noCache: true
}) //6. Definimos o servidor e a variável
// que configurada com o view engine e desativamos 
//o cache


server.listen(3333, function() {
  console.log('servidor em testes')
})

server.get('/', function(req, res){
  return res.render('about')
})

server.get('/courses', function(req, res){
  
  return res.render('courses', {courses})
})

server.get("/courses/:id", function(req, res) {
  const id = req.params.id;
  
  const course = courses.find(function(course){
    return course.id == id
  })
  if (!course) {
    return res.send('Course not found!')
  }
  return res.render('course', {course})
  
});



