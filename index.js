import express from 'express'
import path from 'path'

const app = express()
const port = 3000
const host = 'localhost' //127.0.0.1

let cursos = [{cod: '001', curso: 'Desenvolvimento de Sistemas', ch: 40, tipo: 'Técnico'}] //array para armazenar os cursos cadastrados

app.use(express.json())//middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }))//middleware para requisição do formulário


app.get('/', (req, res) => {
  res.send('<h1> Página Inicial</h1>')
})


app.get('/cadastro', (req, res) => {
  res.sendFile(path.resolve('cadastro.html'))
})

app.get('/busca', (req, res) => {
  res.sendFile(path.resolve('buscaPorCurso.html'))
})

//rota para adicionar cursos
app.post('/curso', (req, res) => {

    const cod = req.body.cod
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

const cursoNovo = {cod: cod, curso: curso, ch: ch, tipo: tipo} //criação de um novo objeto curso com os dados recebidos do formulário

cursos.push(cursoNovo) //adiciona o novo curso ao array de cursos

    // const {cod,curso, ch, tipo} = req.body // desestruturação do objeto req.body para obter os valores dos campos do formulário
    // console.log(req.body) vizualizar o corpo da requisição no console
  res.status(200).json({mensagem: 'Curso cadastrado com sucesso'})

})

app.get('/cursos', (req, res) => {
  res.status(200).json(cursos) //retorna o array de cursos em formato JSON
})

//rota que vai atualizar todos os dados do curso, ou seja, o nome do curso, a carga horária e o tipo do curso
app.put('/curso/:cod', (req, res) => {
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if
(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

const  {cod,curso, ch, tipo} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário

if(!curso || !ch || !tipo) return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'}) //verifica se todos os campos foram preenchidos, caso contrário retorna um erro 400 com uma mensagem de erro em formato JSON 

cursoEncontrado.curso = curso //atualiza o nome do curso encontrado com o valor recebido do formulário
cursoEncontrado.ch = ch //atualiza a carga horária do curso encontrado com o valor recebido do formulário
cursoEncontrado.tipo = tipo //atualiza o tipo do curso encontrado com o valor recebido do formulário

const cursoAtual = {cod, curso, ch, tipo} //criação de um novo objeto cursoAtual com os dados atualizados do curso encontrado

  res.status(200).json({mensagem: 'Curso atualizado com sucesso', cursoAtual}) //retorna uma mensagem de sucesso em formato JSON

})


app.delete('/curso/:cod', (req, res) => {
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if(cursoEncontrado === -1) return res.status(404).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

  cursos.splice(cursoEncontrado , 1) //remove o curso encontrado do array de cursos

  res.status(200).json({mensagem: 'Curso deletado com sucesso'}) //retorna uma mensagem de sucesso em formato JSON
})



app.pathch('/curso/:cod', (req, res) => {
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON  

  const {cod,curso, ch, tipo} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário


  if(curso !== undefined || curso !== '' || curso !== null) cursoEncontrado.curso = curso //atualiza o nome do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null
  if(ch !== undefined || ch !== '' || ch !== null) cursoEncontrado.ch = ch //atualiza a carga horária do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null
  if(tipo !== undefined || tipo !== '' || tipo !== null) cursoEncontrado.tipo = tipo //atualiza o tipo do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null

const cursoAtual = {cod: cursoEncontrado.cod, curso: cursoEncontrado.curso, ch: cursoEncontrado.ch, tipo: cursoEncontrado.tipo} //criação de um novo objeto cursoAtual com os dados atualizados do curso encontrado

  res.status(200).json({mensagem: 'Curso atualizado com sucesso', cursoAtual}) //retorna uma mensagem de sucesso em formato JSON
  
})

app.get('/curso/:curso', (req, res) => {
  const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)
  if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})
  res.status(200).json(cursoEncontrado)
})






















app.listen(port, host, () => {
  console.log(`Servidor em execução em: http://${host}:${port}`)
})