import express from 'express'
import path from 'path'


const routerAluno = express()


let alunos = [{Mat: '001', Nome: 'José Daniel Ferreira', telefone: '98874-0000', email: 'jose@gmail.com', curso: 'Desenvolvimento de Sistemas'}] //array para armazenar os alunos cadastrados




routerAluno.get('/cadastroAluno', (req, res) => {
  res.sendFile(path.resolve('./src/public/html/cadastroAluno.html'))
})

routerAluno.get('/busca', (req, res) => {
  res.sendFile(path.resolve('./src/public/html/buscaPorCurso.html'))
})

//rota para adicionar alunos
routerAluno.post('/aluno', (req, res) => {

    const Mat = req.body.Mat
    const Nome = req.body.Nome
    const telefone = req.body.telefone
    const email = req.body.email
    const curso = req.body.curso

const alunoNovo = {Mat: Mat, Nome: Nome, telefone: telefone, email: email, curso: curso} //criação de um novo objeto aluno com os dados recebidos do formulário

alunos.push(alunoNovo) //adiciona o novo aluno ao array de alunos

    // const {cod,curso, ch, tipo} = req.body // desestruturação do objeto req.body para obter os valores dos campos do formulário
    // console.log(req.body) vizualizar o corpo da requisição no console
  res.status(200).json({mensagem: 'Aluno cadastrado com sucesso'})

})

routerAluno.get('/alunos', (req, res) => {
  res.status(200).json(alunos) //retorna o array de alunos em formato JSON
})

//rota que vai atualizar todos os dados do aluno, ou seja, o nome do aluno, o telefone e o email do aluno
routerAluno.put('/aluno/:Mat', (req, res) => {
  const alunoEncontrado = alunos.find(a => a.Mat === req.params.Mat) //encontra o aluno pela matrícula passada como parâmetro na URL
  if(!alunoEncontrado) return res.status(500).json({mensagem: 'Aluno não encontrado'}) //se o aluno não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

const  {Mat, Nome, telefone, email, curso} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário

if(!Nome || !telefone || !email || !curso) return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'}) //verifica se todos os campos foram preenchidos, caso contrário retorna um erro 400 com uma mensagem de erro em formato JSON

alunoEncontrado.Nome = Nome //atualiza o nome do aluno encontrado com o valor recebido do formulário
alunoEncontrado.telefone = telefone //atualiza o telefone do aluno encontrado com o valor recebido do formulário
alunoEncontrado.email = email //atualiza o email do aluno encontrado com o valor recebido do formulário
alunoEncontrado.curso = curso //atualiza o curso do aluno encontrado com o valor recebido do formulário

const alunoAtual = {Mat, Nome, telefone, email, curso} //criação de um novo objeto alunoAtual com os dados atualizados do aluno encontrado

  res.status(200).json({mensagem: 'Aluno atualizado com sucesso', alunoAtual}) //retorna uma mensagem de sucesso em formato JSON

})


routerAluno.delete('/aluno/:Mat', (req, res) => {
  const alunoEncontrado = alunos.find(a => a.Mat === req.params.Mat) //encontra o aluno pela matrícula passada como parâmetro na URL
  if(!alunoEncontrado) return res.status(500).json({mensagem: 'Aluno não encontrado'}) //se o aluno não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

  alunos.splice(alunoEncontrado , 1) //remove o aluno encontrado do array de alunos

  res.status(200).json({mensagem: 'Aluno deletado com sucesso'}) //retorna uma mensagem de sucesso em formato JSON

})



routerAluno.patch('/aluno/:Mat', (req, res) => {
  const alunoEncontrado = alunos.find(a => a.Mat === req.params.Mat) //encontra o aluno pela matrícula passada como parâmetro na URL
  if(!alunoEncontrado) return res.status(500).json({mensagem: 'Aluno não encontrado'}) //se o aluno não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

  const {Mat, Nome, telefone, email, curso} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário


  if(curso !== undefined && curso !== '' && curso !== null) alunoEncontrado.curso = curso //atualiza o nome do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null

const alunoAtual = {Mat: alunoEncontrado.Mat, Nome: alunoEncontrado.Nome, telefone: alunoEncontrado.telefone, email: alunoEncontrado.email, curso: alunoEncontrado.curso} //criação de um novo objeto alunoAtual com os dados atualizados do aluno encontrado

  res.status(200).json({mensagem: 'Aluno atualizado com sucesso', alunoAtual}) //retorna uma mensagem de sucesso em formato JSON
})

routerAluno.get('/aluno/:Mat', (req, res) => {
  const alunoEncontrado = alunos.find(a => a.Mat === req.params.Mat)
  if(!alunoEncontrado) return res.status(404).json({mensagem: 'Aluno não encontrado'})
  res.status(200).json(alunoEncontrado)
})


export default routerAluno



















