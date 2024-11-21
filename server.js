import express from 'express';

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

function buscarLivroPorID(id){
    return livros.findIndex((livro) => {
        return livro.id === Number(id);
    });
};

app.get("/livros/:id", (req, res) => {
    const index = buscarLivroPorID(req.params.id);
    res.status(200).json(livros[index]);
});