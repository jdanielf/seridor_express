import express from 'express'

import {criarCurso,cadastroCurso, procurarCurso, mostrarCursos, 
   atualizaTodosCursos, deletaCurso,atualizaUmCurso,procurarCurso1

} from '../controllers/controllerCurso.js' //importação da função criarCurso do arquivo controllerCurso.js
import routerAluno from './routerAluno.js'



const routerCurso = express.Router()

routerCurso.get('/cadastro', cadastroCurso) //rota para exibir o formulário de cadastro de cursos, chama a função cadastro do controllerCurso.js para processar a requisição

routerCurso.get('/busca', procurarCurso) //rota para exibir o formulário de busca de cursos, chama a função procurarCurso do controllerCurso.js para processar a requisição

//rota para adicionar cursos
routerCurso.post('/curso', criarCurso) //rota para criar um novo curso, chama a função criarCurso do controllerCurso.js para processar a requisição

routerCurso.get('/cursos', mostrarCursos) //rota para exibir todos os cursos cadastrados, chama a função mostrarCursos do controllerCurso.js para processar a requisição




//rota que vai atualizar todos os dados do curso, ou seja, o nome do curso, a carga horária e o tipo do curso
routerCurso.put('/curso/:cod', atualizaTodosCursos) //rota para atualizar um curso existente, chama a função atualizaTodosCursos do controllerCurso.js para processar a requisição



routerCurso.delete('/curso/:cod', deletaCurso) //rota para deletar um curso existente, chama a função deletaCurso do controllerCurso.js para processar a requisição





routerCurso.patch('/curso/:cod', atualizaUmCurso) //rota para atualizar um curso existente, chama a função atualizaUmCurso do controllerCurso.js para processar a requisição
  


routerCurso.get('/curso/:curso', procurarCurso1) //rota para buscar um curso pelo nome, chama a função procurarCurso1 do controllerCurso.js para processar a requisição



export default routerCurso



















