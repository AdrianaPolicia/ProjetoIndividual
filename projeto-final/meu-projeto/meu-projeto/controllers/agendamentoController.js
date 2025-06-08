// controllers/agendamentoController.js

const agendamentoModel = require('../models/agendamentoModel');

const getAllAgendamentos = async (req, res) => {
  try {
    const agendamentos = await agendamentoModel.getAllAgendamentos();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgendamentoById = async (req, res) => {
  try {
    const agendamento = await agendamentoModel.getAgendamentoById(req.params.id);
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAgendamento = async (req, res) => {
  try {
    const { usuario_id, sala_id, horario_id, data, nome, turma, grupo } = req.body;
    const newAgendamento = await agendamentoModel.createAgendamento(usuario_id, sala_id, horario_id, data, nome, turma, grupo);
    res.status(201).json(newAgendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAgendamento = async (req, res) => {
  try {
    const { usuario_id, sala_id, horario_id, data, nome, turma, grupo } = req.body;
    const updatedAgendamento = await agendamentoModel.updateAgendamento(req.params.id, usuario_id, sala_id, horario_id, data, nome, turma, grupo);
    if (updatedAgendamento) {
      res.status(200).json(updatedAgendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAgendamento = async (req, res) => {
  try {
    const deletedAgendamento = await agendamentoModel.deleteAgendamento(req.params.id);
    if (deletedAgendamento) {
      res.status(200).json({ success: true, message: 'Agendamento cancelado com sucesso', data: deletedAgendamento });
    } else {
      res.status(404).json({ success: false, error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obter agendamentos do usuário atual
const getAgendamentosByUser = async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id || req.user?.id;
    if (!usuario_id) {
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }
    
    const agendamentos = await agendamentoModel.getAgendamentosByUser(usuario_id);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getAgendamentosByUser
};

