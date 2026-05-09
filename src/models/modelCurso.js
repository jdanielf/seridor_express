import fs from 'fs'


// export let cursos = [{
//     cod: '001',
//      curso: 'Desenvolvimento de Sistemas', 
//      ch: 40,
//       tipo: 'Técnico'}] //array para armazenar os cursos cadastrados

const caminho = '.data/cursos.json' //caminho do arquivo JSON para armazenar os cursos cadastrados

export function lerCursos() {
    try {
        if (!fs.existsSync(caminho)) {
            fs.writeFileSync(caminho  ) //se o arquivo não existir, cria um novo arquivo vazio
            fs.writeFileSync(caminho) //escreve um array vazio no arquivo JSON
        }

        const conteudo = fs.readFileSync(caminho, 'utf-8') //lê o conteúdo do arquivo JSON
        if (conteudo === '') {
            return [] //se o conteúdo do arquivo for vazio, retorna um array vazio
        }else {
            return JSON.parse(conteudo) //retorna o conteúdo do arquivo JSON como um array de cursos
        }
    }catch (error) {
            console.error('Erro ao ler o arquivo de cursos:', error)
            return [] //em caso de erro, retorna um array vazio
        }
    }
        export function salvarCursos(cursos) {
           console.log(cursos) //log para verificar os dados que estão sendo salvos
           try {
               fs.writeFileSync(caminho, JSON.stringify(cursos, null, 2)) //escreve o array de cursos no arquivo JSON, formatado com indentação de 2 espaços
           }catch (error) {
               console.error('Erro ao salvar o arquivo de cursos:', error)
           }        
        }
    