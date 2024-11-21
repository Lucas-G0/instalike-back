import express from 'express';
import conectarBanco from './src/config/dbConfig.js';

const conexao = await conectarBanco(process.env.STRING_CONEXAO);

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

async function getAllLivros() {
    const db = conexao.db("imersaodev");
    const colecao = db.collection("livros");
    return colecao.find().toArray();
}


function buscarLivroPorID(id){
    return livros.findIndex((livro) => {
        return livro.id === Number(id);
    });
};

app.get("/livros", async (req, res) => {
    const livros = await getAllLivros();
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscarLivroPorID(req.params.id);
    res.status(200).json(livros[index]);
});