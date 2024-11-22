import {getAllLivros, createLivro} from '../models/livrosModel.js';

export async function listarLivros(req, res) 
{
    const livros = await getAllLivros();
    res.status(200).json(livros);
}

export async function createNewLivro(req, res)
{
    const novoLivro = req.body;
    try {
        const livro = await createLivro(novoLivro);
        res.status(201).json(livro);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro:":" Houve um erro ao tentar criar um novo livro."});
    }
}