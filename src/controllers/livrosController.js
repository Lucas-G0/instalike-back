import fs from "fs";
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

export async function uploadFile(req, res)
{
    const novoLivro = {
        titulo: "",
        autor: "",
        ano: "",
        genero: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const livroCriado = await createLivro(novoLivro);
        const imagemAtualizada = `uploads/${livroCriado.insertedId}.jpeg`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(livroCriado);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro:":" Houve um erro ao tentar criar um novo livro."});
    }
}