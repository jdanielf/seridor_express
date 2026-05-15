import path from 'path'
import bdConexao from '../config/database.js'



export const criarCurso = (req,res) =>{

     const {
      cod, curso, ch, tipo
    } = req.body
if(!cod || !curso || !ch || !tipo){ return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'})} //verifica se todos os campos foram preenchidos, caso contrário retorna um erro 400 com uma mensagem de erro em formato JSON
        const sql = 'INSERT INTO cursos (cod, curso, ch, tipo) VALUES (?, ?, ?, ?)' //consulta SQL para inserir um novo curso na tabela 'cursos'
    bdConexao.query(sql, [cod, curso, ch, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar curso', err })
            return 
        }
        res.redirect('/cursos') //redireciona para a rota de exibição de cursos após o cadastro
    })      

//   res.sendFile(path.resolve('./src/public/html/cadastro.html')) 

}



export function cadastroCurso(req, res)  {
  res.sendFile(path.resolve('./src/public/html/cadastro.html')) 

}


   

export function procurarCurso(req, res) {
  res.sendFile(path.resolve('./src/public/html/buscaPorCurso.html'))
}

export  function mostrarCursos(req, res){
   
    const sql = 'SELECT * FROM cursos' //consulta SQL para selecionar todos os cursos da tabela 'cursos'
     bdConexao.query(sql, (err, cursos) => {
        if(err) { res.status(500).json({mensagem: 'Erro ao buscar os cursos',err})
            return   //em caso de erro, retorna um erro 500 com uma mensagem de erro em formato JSON
        }
        res.render('cursos',{cursos}) //renderiza a página 'cursos.ejs' passando o array de cursos como variável para ser exibida na página
    })
  

   
}

export function mostraralunos(req, res){
  res.render('alunos', {alunos})
}



export function atualizaTodosCursos(req, res){
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if
  (!cursoEncontrado) return res.status(500).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

const  {cod,curso, ch, tipo} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário

if(!curso || !ch || !tipo) return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'}) //verifica se todos os campos foram preenchidos, caso contrário retorna um erro 400 com uma mensagem de erro em formato JSON 

cursoEncontrado.curso = curso //atualiza o nome do curso encontrado com o valor recebido do formulário
cursoEncontrado.ch = ch //atualiza a carga horária do curso encontrado com o valor recebido do formulário
cursoEncontrado.tipo = tipo //atualiza o tipo do curso encontrado com o valor recebido do formulário

const cursoAtual = {cod, curso, ch, tipo} //criação de um novo objeto cursoAtual com os dados atualizados do curso encontrado

  res.status(200).json({mensagem: 'Curso atualizado com sucesso', cursoAtual}) //retorna uma mensagem de sucesso em formato JSON

}

export function deletaCurso(req, res) {
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if(cursoEncontrado === -1) return res.status(500).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON

  cursos.splice(cursoEncontrado , 1) //remove o curso encontrado do array de cursos

  res.status(200).json({mensagem: 'Curso deletado com sucesso'}) //retorna uma mensagem de sucesso em formato JSON

}

export function atualizaUmCurso(req, res)  {
  const cursoEncontrado = cursos.find(c => c.cod === req.params.cod) //encontra o curso pelo nome passado como parâmetro na URL
  if(!cursoEncontrado) return res.status(500).json({mensagem: 'Curso não encontrado'}) //se o curso não for encontrado, retorna um erro 404 com uma mensagem de erro em formato JSON  

  const {cod,curso, ch, tipo} = req.body //desestruturação do objeto req.body para obter os valores dos campos do formulário


  if(curso !== undefined && curso !== '' && curso !== null) cursoEncontrado.curso = curso //atualiza o nome do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null
  if(ch !== undefined && ch !== '' && ch !== null) cursoEncontrado.ch = Number(ch) //atualiza a carga horária do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null
  if(tipo !== undefined && tipo !== '' && tipo !== null) cursoEncontrado.tipo = tipo //atualiza o tipo do curso encontrado com o valor recebido do formulário, caso o valor seja diferente de undefined, vazio ou null

const cursoAtual = {cod: cursoEncontrado.cod, curso: cursoEncontrado.curso, ch: cursoEncontrado.ch, tipo: cursoEncontrado.tipo} //criação de um novo objeto cursoAtual com os dados atualizados do curso encontrado

  res.status(200).json({mensagem: 'Curso atualizado com sucesso', cursoAtual}) //retorna uma mensagem de sucesso em formato JSON

}

export function procurarCurso1(req, res) {
  const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)
  if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})
  res.status(200).json(cursoEncontrado)

}

