import express from 'express'
import routerCurso from './src/routers/routerCurso.js'
// import routerAluno from './src/routers/routerAluno.js' 
import path from 'path'
import morgan from 'morgan' //importação do morgan para log de requisições HTTP
import dotenv from 'dotenv' //importação do dotenv para carregar variáveis de ambiente do arquivo .env
import { fileURLToPath } from 'url'
import bdConexao from './src/config/database.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config() //carrega as variáveis de ambiente do arquivo .env

const app = express()

const port = process.env.PORT || 3000 //porta do servidor, definida na variável de ambiente PORT ou padrão 3000
const host = process.env.HOST || 'localhost' //host do servidor, definido na variável de ambiente HOST ou padrão 'localhost'


app.use(express.json())//middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }))//middleware para requisição do formulário

app.use(express.static(path.join(__dirname, 'src/public')))
app.use(morgan('dev')) //middleware para log de requisições HTTP no formato 'dev', que exibe informações detalhadas sobre cada requisição no console

app.set('view engine', 'ejs') //configuração do EJS como motor de visualização para renderizar templates HTML dinâmicos
app.set('views', path.join(__dirname, 'src/views'))

app.use(routerCurso) //middleware para usar as rotas definidas no routerCurso
// app.use(routerAluno)

app.get('/', (req, res) => {
  res.render('index', { title: 'Bem-vindo ao Sistema de Gerenciamento de Cursos e Alunos' }) //rota para a página inicial, renderizando o template 'index.ejs' com um título
})




app.listen(port, host, () => {
  console.log(`Servidor em execução em: http://${host}:${port}`)
})

