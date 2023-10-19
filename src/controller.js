import {pool} from './database.js';

class LibrosController{
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    async getOne(req, res){
        const libro = req.body;
        const id_libro = parseInt(libro.id);
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id_libro]);
        res.json(result);
            }
        }
    
  

export const libro = new LibrosController();
