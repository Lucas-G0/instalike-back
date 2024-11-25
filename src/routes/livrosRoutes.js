import express from "express";
import multer from "multer";
import {createNewLivro, listarLivros, uploadFile, updateNewLivro, findLivroById} from "../controllers/livrosController.js";

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

    app.put("/livros/upload/:id", updateNewLivro);

    app.get("/livros/:id", findLivroById);
}

export default router;