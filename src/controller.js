import {pool} from './database.js';

class LibrosController{
   // MOSTRAR TODOS LOS LIBROS
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    // MOSTRAR SÓLO UN LIBRO
   async getOne(req, res) {
    try {
        const libro = req.body;
        const id_libro = parseInt(libro.id);
        if (isNaN(id_libro)) {
            throw new Error('id invalido');
        }

        const [result] = await pool.query(`SELECT * FROM libros WHERE id = ?`, [id_libro]);
        if (result.length === 0) {
            throw new Error('Libro no encontrado');
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
    // AGREGAR UN LIBRO
 async add(req, res) {
    try {
        const libro = req.body;
        const missingAttributes = [];
        const invalidAttributes = [];

        // Defino los atributos esperados
        const expectedAttributes = ['nombre', 'autor', 'categoria', 'anopublicacion', 'isbn'];

        // chequea atributos invalidos o faltantes
        for (const attr in libro) {
            if (!expectedAttributes.includes(attr)) {
                invalidAttributes.push(attr);
            }
        }

        if (missingAttributes.length > 0) {
            throw new Error(`Faltan Datos: ${missingAttributes.join(', ')}`);
        }

        if (invalidAttributes.length > 0) {
            throw new Error(`Datos invalidos: ${invalidAttributes.join(', ')}`);
        }

        const [result] = await pool.query(
            `INSERT INTO libros(nombre, autor, categoria, anopublicacion, isbn) VALUES(?, ?, ?, ?, ?)`,
            [libro.nombre, libro.autor, libro.categoria, libro.anopublicacion, libro.isbn]
        );

        res.json({ "Libro Insertado": result.insertId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
              
    // BORRAR UN LIBRO
   async delete(req, res) {
    try {
        const libro = req.body;

        if (!libro.isbn || typeof libro.isbn !== 'string') {
            throw new Error('DATO MAL INGRESADO');
        }

        const [result] = await pool.query(`DELETE FROM libros WHERE isbn = ?`, [libro.isbn]);

        if (result.affectedRows === 0) {
            throw new Error('NO SE ENCONTRO ISBN');
        }

        res.json({ "LIBRO ELIMINADO": result.affectedRows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
    // ACTUALIZAR UN LIBRO
    async update(req, res) {
    try {
        const libro = req.body;

        // Define los atributos que pueden ser actualizados
        const expectedAttributes = ['nombre', 'autor', 'categoria', 'anopublicacion', 'isbn', 'id'];

        // Chequea si hay atributos que no esten en la lista
        for (const attr in libro) {
            if (!expectedAttributes.includes(attr)) {
                throw new Error(`Dato invalidos: ${attr}`);
            }
        }

        // Chequea si falta el id del libro
        if (!libro.id) {
            throw new Error('AGREGUE EL "ID" DEL LIBRO A MODIFICAR');
        }

        const [result] = await pool.query(
            `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, anopublicacion = ?, isbn = ? WHERE id = ?`,
            [libro.nombre, libro.autor, libro.categoria, libro.anopublicacion, libro.isbn, libro.id]
        );

        if (result.changedRows === 0) {
            throw new Error('ID no encontrado');
        }

        res.json({ "LIBROS ACTUALIZADOS": result.changedRows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

    
        }
    
  

export const libro = new LibrosController();
