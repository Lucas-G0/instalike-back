import express from "express";
import multer from "multer";
import {createNewLivro, listarLivros, uploadFile} from "../controllers/livrosController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

const router = (app) => {
    app.use(express.json());

    app.get("/livros", listarLivros);

    app.post("/livros", createNewLivro);

    app.post("/livros/upload", upload.single('imagem'), uploadFile);

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