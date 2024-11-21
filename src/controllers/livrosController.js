import {getAllLivros} from '../models/livrosModel.js';

export async function listarLivros(req, res) 
{
    const posts = await getAllLivros();
    res.status(200).json(posts);
}