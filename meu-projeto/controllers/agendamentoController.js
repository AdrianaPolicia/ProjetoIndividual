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
    const { usuario_id, sala_id, horario_id, data, criado_em } = req.body;
    const newAgendamento = await agendamentoModel.createAgendamento(usuario_id, sala_id, horario_id, data, criado_em);
    res.status(201).json(newAgendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAgendamento = async (req, res) => {
  try {
    const { usuario_id, sala_id, horario_id, data, criado_em } = req.body;
    const updatedAgendamento = await agendamentoModel.updateAgendamento(usuario_id, sala_id, horario_id, data, criado_em);
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
      res.status(200).json(deletedAgendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
};