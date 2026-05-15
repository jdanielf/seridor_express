import fs from 'fs'
import path from 'path'

const caminho = path.join(import.meta.dirname, '..', 'database', 'alunos.json') //caminho do arquivo JSON para armazenar os cursos cadastrados

export function lerAlunos() {
    try {
        const caminhoAlunos = path.join(import.meta.dirname, '..', 'database', 'alunos.json') //caminho do arquivo JSON para armazenar os alunos cadastrados        
        if (!fs.existsSync(caminhoAlunos)) {
            fs.writeFileSync(caminhoAlunos, '[]', 'utf-8') //se o arquivo JSON não existir, cria um novo arquivo vazio com um array vazio
        }
        const conteudo = fs.readFileSync(caminhoAlunos, 'utf-8') //lê o conteúdo do arquivo JSON
        if (conteudo === '') {
            return [] //se o conteúdo do arquivo for vazio, retorna um array vazio
        }else {
            return JSON.parse(conteudo) //retorna o conteúdo do arquivo JSON como um array de alunos
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo de alunos:', error)
        return [] //em caso de erro, retorna um array vazio
    }
}


export function salvarAlunos(alunos) {
    try {
        fs.writeFileSync(caminho, JSON.stringify(alunos, null, 2), 'utf-8')
    } catch (error) {
        console.error('Erro ao salvar alunos:', error)
    }
}