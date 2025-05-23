const db = require('../config/db');

class Agendamento {
  static async getAllAgendamentos() {
    const result = await db.query('SELECT * FROM agendamentos');
    return result.rows;
  }

  static async getAgendamentoById(id) {
    const result = await db.query('SELECT * FROM agendamentos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createAgendamento(data) {
    const result = await db.query(
      'INSERT INTO agendamentos (usuario_id, sala_id, horario_id, data, criado_em) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [data.usuario_id, data.sala_id, data.horario_id, data.data]
    );
    return result.rows[0];
  }

  static async updateAgendamento (id, data) {
    const result = await db.query(
      'UPDATE agendamentos SET usuario_id = $1, sala_id = $2, horario_id = $3, data = $4 WHERE id = $5 RETURNING *',
      [data.usuario_id, data.sala_id, data.horario_id, data.data, id]
    );
    return result.rows[0];
  }

  static async deleteAgendamento (id) {
    const result = await db.query('DELETE FROM agendamentos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Agendamento;