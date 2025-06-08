// controllers/reclamacaoController.js

const reclamacaoModel = require('../models/reclamacaoModel');

const getAllReclamacoes = async (req, res) => {
  try {
    const reclamacoes = await reclamacaoModel.getAllReclamacoes();
    res.status(200).json(reclamacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReclamacaoById = async (req, res) => {
  try {
    const Reclamacao = await reclamacaoModel.getReclamacaoById(req.params.id);
    if (reclamacao) {
      res.status(200).json(reclamacao);
    } else {
      res.status(404).json({ error: 'Reclamacao não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReclamacao = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const newReclamacao = await reclamacaoModel.createReclamacao(nome_completo, email, senha_hash, turma, grupo);
    res.status(201).json(newReclamacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReclamacao = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const updatedReclamacao = await reclamacaoModel.updateReclamacao(req.params.id, nome_completo, email, senha_hash, turma, grupo);
    if (updatedReclamacao) {
      res.status(200).json(updatedReclamacao);
    } else {
      res.status(404).json({ error: 'Reclamacao não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReclamacao = async (req, res) => {
  try {
    const deletedReclamacao = await reclamacaoModel.deleteReclamacao(req.params.id);
    if (deletedReclamacao) {
      res.status(200).json(deletedReclamacao);
    } else {
      res.status(404).json({ error: 'Reclamacao não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReclamacoes,
  getReclamacaoById,
  createReclamacao,
  updateReclamacao,
  deleteReclamacao
};