import fs from "fs";
import {getAllLivros, createLivro, updateLivro, buscarLivroPorID} from '../models/livrosModel.js';
import gerarDescricaoComGemini from "../services/geminiService.js";

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

export async function updateNewLivro(req, res)
{
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.jpeg`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpeg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const novoLivro = {
            titulo: req.body.titulo,
            descricao: descricao,
            autor: req.body.autor,
            ano: req.body.ano,
            genero: req.body.genero,
            imgUrl: imgUrl,
            alt: req.body.alt
        };
        const livro = await updateLivro(id, novoLivro);
        res.status(201).json(livro);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro:":" Houve um erro ao tentar criar um novo livro."});
    }
}

export async function findLivroById(req, res)
{
    const livro = buscarLivroPorID(req.params.id);
    res.status(200).json(livro);
}