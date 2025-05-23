const db = require('../config/db');

class Horario {
  static async getAllHorarios() {
    const result = await db.query('SELECT * FROM horarios');
    return result.rows;
  }

  static async getHorarioById(id) {
    const result = await db.query('SELECT * FROM horarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createHorario(data) {
    const result = await db.query(
      'INSERT INTO horarios (horario_inicio, horario_fim) VALUES ($1, $2) RETURNING *',
      [data.horario_inicio, data.horario_fim]
    );
    return result.rows[0];
  }

  static async updateHorario(id, data) {
    const result = await db.query(
      'UPDATE horarios SET horario_inicio = $1, horario_fim = $2 WHERE id = $3 RETURNING *',
      [data.horario_inicio, data.horario_fim, id]
    );
    return result.rows[0];
  }

  static async deleteHorario(id) {
    const result = await db.query('DELETE FROM horarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Horario;