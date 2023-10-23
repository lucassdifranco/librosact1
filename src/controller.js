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
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anopublicacion, isbn) VALUES(?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anopublicacion, libro.isbn]);
        res.json({"Libro Instertado": result.insertId});
    }
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros Where id=(?)`, [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }
    
        }
    
  

export const libro = new LibrosController();
