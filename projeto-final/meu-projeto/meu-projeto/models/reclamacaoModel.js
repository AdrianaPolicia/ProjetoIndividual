const db = require('../config/db');

class Reclamacao {
  static async getAllReclamacoes() {
    const result = await db.query('SELECT * FROM reclamacoes');
    return result.rows;
  }

  static async getReclamacaoById(id) {
    const result = await db.query('SELECT * FROM reclamacoes WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createReclamacao(data) {
    const result = await db.query(
      'INSERT INTO reclamacoes (usuario_id, sala_id, horario_id, data, descricao, criado_em) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [data.usuario_id, data.sala_id, data.horario_id, data.data, descricao]
    );
    return result.rows[0];
  }

  static async updateReclamacao(id, data) {
    const result = await db.query(
      'UPDATE reclamacoes SET usuario_id = $1, sala_id = $2, horario_id = $3, data = $4, descricao = $5 WHERE id = $6 RETURNING *',
      [data.usuario_id, data.sala_id, data.horario_id, data.data, descricao, id]
    );
    return result.rows[0];
  }

  static async deleteReclamacao(id) {
    const result = await db.query('DELETE FROM reclamacoes WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Reclamacao;