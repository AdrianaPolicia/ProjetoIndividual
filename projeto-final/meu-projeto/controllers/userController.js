// controllers/userController.js

const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const newUser = await userModel.createUser(nome_completo, email, senha_hash, turma, grupo);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome_completo, email, senha_hash, turma, grupo } = req.body;
    const updatedUser = await userModel.updateUser(req.params.id, nome_completo, email, senha_hash, turma, grupo);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método de login
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Para fins de demonstração, vamos apenas redirecionar para a página de horários
    // Em um sistema real, você verificaria as credenciais no banco de dados
    
    // Simulando um login bem-sucedido
    if (email && senha) {
      return res.redirect('/horarios');
    }
    
    // Se as credenciais estiverem incorretas
    res.render('layout/main', {
      pageTitle: 'Login - Inteli',
      content: '../pages/login',
      cssFile: 'login.css',
      error: 'Email ou senha incorretos'
    });
  } catch (error) {
    res.status(500).render('layout/main', {
      pageTitle: 'Login - Inteli',
      content: '../pages/login',
      cssFile: 'login.css',
      error: 'Erro ao fazer login'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};

