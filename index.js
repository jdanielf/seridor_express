import express from 'express'
import routerCurso from './src/routers/routerCurso.js'
import routerAluno from './src/routers/routerAluno.js' 

const app = express()
const port = 3000
const host = 'localhost' //127.0.0.1



app.use(express.json())//middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true }))//middleware para requisição do formulário

app.use(routerCurso) //middleware para usar as rotas definidas no routerCurso
app.use(routerAluno)

app.get('/', (req, res) => {
  res.send('<h1> Página Inicial</h1>')
})




app.listen(port, host, () => {
  console.log(`Servidor em execução em: http://${host}:${port}`)
})