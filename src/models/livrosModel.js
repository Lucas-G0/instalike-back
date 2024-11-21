import conectarBanco from '../config/dbConfig.js';

const conexao = await conectarBanco(process.env.STRING_CONEXAO);

export async function getAllLivros() {
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    return colecao.find().toArray();
}