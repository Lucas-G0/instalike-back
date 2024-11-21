import express from "express";
import {listarLivros} from "../controllers/livrosController.js";

const router = (app) => {
    app.use(express.json());

    app.get("/livros", listarLivros);

    function buscarLivroPorID(id){
        return livros.findIndex((livro) => {
            return livro.id === Number(id);
        });
    };

    app.get("/livros/:id", (req, res) => {
        const index = buscarLivroPorID(req.params.id);
        res.status(200).json(livros[index]);
    });
}

export default router;