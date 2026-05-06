import express from 'express'
import path from 'path'

const app = express()
const port = 3000
const host = 'localhost' //127.0.0.1

let cursos = [{curso: 'Desenvolvimento de Sistemas', ch: '40h', tipo: 'Técnico'}] //array para armazenar os cursos cadastrados

app.use(express.json())//middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }))//middleware para requisição do formulário


app.get('/', (req, res) => {
  res.send('<h1> Página Inicial</h1>')
})


app.get('/cadastro', (req, res) => {
  res.sendFile(path.resolve('cadastro.html'))
})

app.post('/curso', (req, res) => {
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

const cursoNovo = {curso: curso, ch: ch, tipo: tipo} //criação de um novo objeto curso com os dados recebidos do formulário

cursos.push(cursoNovo) //adiciona o novo curso ao array de cursos

    // const {curso, ch, tipo} = req.body // desestruturação do objeto req.body para obter os valores dos campos do formulário
    // console.log(req.body) vizualizar o corpo da requisição no console
  res.status(200).json({mensagem: 'Curso cadastrado com sucesso'})

})

app.get('/cursos', (req, res) => {
  res.status(200).json(cursos) //retorna o array de cursos em formato JSON
})

app.listen(port, host, () => {
  console.log(`Servidor em execução em: http://${host}:${port}`)
})