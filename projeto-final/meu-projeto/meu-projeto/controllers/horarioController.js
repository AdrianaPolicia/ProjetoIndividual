// controllers/horarioController.js

const horarioModel = require('../models/horarioModel');

const getAllHorarios = async (req, res) => {
  try {
    const horarios = await horarioModel.getAllHorarios();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHorarioById = async (req, res) => {
  try {
    const horario = await horarioModel.getHorarioById(req.params.id);
    if (horario) {
      res.status(200).json(horario);
    } else {
      res.status(404).json({ error: 'Horário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHorario = async (req, res) => {
  try {
    const { horario_inicio, horario_fim } = req.body;
    const newHorario = await horarioModel.createHorario(horario_inicio, horario_fim);
    res.status(201).json(newHorario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHorario = async (req, res) => {
  try {
    const { horario_inicio, horario_fim } = req.body;
    const updatedHorario = await horarioModel.updateHorario(req.params.id, horario_inicio, horario_fim);
    if (updatedHorario) {
      res.status(200).json(updatedHorario);
    } else {
      res.status(404).json({ error: 'Horário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHorario = async (req, res) => {
  try {
    const deletedHorario = await horarioModel.deleteHorario(req.params.id);
    if (deletedHorario) {
      res.status(200).json(deletedHorario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHorarios,
  getHorarioById,
  createHorario,
  updateHorario,
  deleteHorario
};