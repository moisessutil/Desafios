const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
const PORT = 3000
const secretKey = 'seuSegredo'
const tokenExpiry = '30m'

const users = []

app.use(bodyParser.json())

// Sign Up
app.post('/signup', (req, res) => {
  const { email, password } = req.body

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ mensagem: 'E-mail já existente' })
  }

  const newUser = { email, password: bcrypt.hashSync(password, 10) }
  users.push(newUser)

  res.json({ mensagem: 'Cadastro criado com sucesso' })
})

// Sign In 
app.post('/signin', (req, res) => {
  const { email, password } = req.body

  const user = users.find(user => user.email === email)

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: tokenExpiry })

  res.json({ token })
})

// Buscar Usuário
app.get('/user', verificarToken, (req, res) => {
  const { email } = req.user
  res.json({ email })
})

// Função de middleware
function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Sessão inválida' })
    }

    req.user = decoded
    next()
  })
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})