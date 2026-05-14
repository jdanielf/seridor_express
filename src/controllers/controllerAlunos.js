import path from 'path'
import { lerAlunos } from '../models/modelAlunos.js' //importação da função lerAlunos do modelAlunos.js para ler os alunos cadastrados no arquivo JSON      
import {v4 as uuid} from 'uuid' //importação da função v4 do pacote uuid para gerar identificadores únicos para os alunos

let alunos = lerAlunos() //variável para armazenar os alunos lidos do arquivo JSON


export function mostraralunos(req, res){
  res.render('alunos', {alunos})
}
