const db = require('../config/db');

class Sala {
  static async getAllSalas() {
    const result = await db.query('SELECT * FROM salas');
    return result.rows;
  }

  static async getSalaById(id) {
    const result = await db.query('SELECT * FROM salas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createSala(data) {
    const result = await db.query(
      'INSERT INTO salas (numero_sala) VALUES ($1) RETURNING *',
      [data.numero_sala]
    );
    return result.rows[0];
  }

  static async updateSala(id, data) {
    const result = await db.query(
      'UPDATE salas SET numero_sala = $1 WHERE id = $2 RETURNING *',
      [data.numero_sala, id]
    );
    return result.rows[0];
  }

  static async deleteSala(id) {
    const result = await db.query('DELETE FROM salas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Sala;