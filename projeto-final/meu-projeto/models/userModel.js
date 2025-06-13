const db = require('../config/db');

class User {
  static async getAllUsers() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  static async getUserById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createUser(data) {
    const result = await db.query(
      'INSERT INTO usuarios (nome_completo, email, senha_hash, turma, grupo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.nome_completo, data.email, data.senha_hash, data.turma, data.grupo]
    );
    return result.rows[0];
  }

  static async updateUser(id, data) {
    const result = await db.query(
      'UPDATE usuarios SET nome_completo = $1, email = $2, senha_hash = $3, turma = $4, grupo = $5 WHERE id = $6 RETURNING *',
      [data.nome_completo, data.email, data.senha_hash, data.turma, data.grupo, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;