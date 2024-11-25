import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarBanco from '../config/dbConfig.js';

const conexao = await conectarBanco(process.env.STRING_CONEXAO);

export async function getAllLivros() {
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    return colecao.find().toArray();
}

export async function createLivro(livro) {
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    return colecao.insertOne(livro);
}

export async function updateLivro(id, novoLivro) {
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoLivro});
}

export async function buscarLivroPorID(id)
{
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    const livro = colecao.findOne({_id: new ObjectId(id)});
    return livro;
};