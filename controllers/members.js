const fs = require('fs') // file system
const data = require('../data.json')
const { age, date} = require('../utils')
const Intl = require('intl')

//index


exports.index = function(req, res) {
  return res.render('members/index', {members: data.members})
}

//create
exports.create = (req, res) => {
  return res.render('members/create')
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

  
  birth = Date.parse(req.body.birth)
  // const id = Number(data.members.length + 1) => corrigindo o id
  
  let id = 1
  const lastMember = data.members[data.members.lenght - 1]
  if (lastMember) {
    id = lastMember + 1
  }
  
  // desestruturando o req.body
  
  data.members.push({
    ...req.body,
    id,
    birth
  })
    

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write File Error')
     
    return res.redirect("/members")
  })

  // return res.send(req.body)
}


//show
exports.show = function(req, res) {
  const {id} = req.params //desestruturando o req.params
  
  const foundMember = data.members.find(function(member){
    return member.id == id
  })

  if (!foundMember) return res.send('Instrutor não localizado!')
  
  const member = {
    ...foundMember, // espalhamento da variável
    birth: date(foundMember.birth).birthDay
  }
  
  return res.render('members/show', {member})

}


//edit
exports.edit = function(req, res) {

  const {id} = req.params //desestruturando o req.params
  
  const foundMember = data.members.find(function(member){
    return member.id == id
  })

  if (!foundMember) return res.send('Instrutor não localizado!')

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', {member})
}

//put - atualizar
exports.put = function(req, res) {


  
  const {id} = req.body //desestruturando o req.body
  
  let index = 0

  const foundMember = data.members.find(function(member, foundIndex){
    if(id == member.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) return res.send('Instrutor não localizado!')

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)


  }

  data.members[index] = member

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write error!')

    return res.redirect(`/members/${id}`)
  })

}

exports.delete = function(req, res) {

  const { id } = req.body

  const filteredMembers = data.members.filter(function(member){
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write file error')

    return res.redirect('/members')
  })

}


