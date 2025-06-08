// controllers/SalaController.js

const salaModel = require('../models/salaModel');

const getAllSalas = async (req, res) => {
  try {
    const Salas = await salaModel.getAllSalas();
    res.status(200).json(Salas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalaById = async (req, res) => {
  try {
    const sala = await salaModel.getSalaById(req.params.id);
    if (sala) {
      res.status(200).json(sala);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSala = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const newSala = await salaModel.createSala(nome_completo, email, senha_hash, turma, grupo);
    res.status(201).json(newSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSala = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const updatedSala = await salaModel.updateSala(req.params.id, nome_completo, email, senha_hash, turma, grupo);
    if (updatedSala) {
      res.status(200).json(updatedSala);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSala = async (req, res) => {
  try {
    const deletedSala = await salaModel.deleteSala(req.params.id);
    if (deletedSala) {
      res.status(200).json(deletedSala);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};