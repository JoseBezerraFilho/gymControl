const fs = require('fs') // file system
const data = require('./data.json')
const { age } = require('./utils')
const Intl = require('intl')

//show
exports.show = function(req, res) {
  const {id} = req.params //desestruturando o req.params
  
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  

  const  instructor = {
    ...foundInstructor, // espalhamento da variável
    birth: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
  }

  if (!foundInstructor) return res.send('Instrutor não localizado!')
  return res.render('instructors/show', {instructor})
}


//create
exports.post = function(req, res) {
  // req.query
  // req.body

  const keys = Object.keys(req.body)
  
  for(key of keys) {
    if (req.body[key] == ''){
      return res.send('Please, fill all fields!')
    }
  }

  
  let {avatar_url, birth, name, services, gender} = req.body
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)
  
  // desestruturando o req.body
  
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  })
    

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write File Error')
     
    return res.redirect("/instructors")
  })

  // return res.send(req.body)
}