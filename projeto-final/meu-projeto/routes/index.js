const express = require('express');
const router = express.Router();

// Rota principal - redireciona para login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Rota de login
router.get('/login', (req, res) => {
  res.render('layout/login_layout', {
    pageTitle: 'Login - Inteli',
    content: '../pages/login',
    cssFile: 'login.css'
  });
});

// Rota de horários
router.get('/horarios', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Horários - Sistema de Agendamento',
    content: '../pages/horarios',
    cssFile: 'horarios.css'
  });
});

// Rota de salas disponíveis
router.get('/salas-disponiveis', (req, res) => {
  const horario = req.query.horario || '13:00';
  res.render('layout/main', {
    pageTitle: 'Salas Disponíveis - Sistema de Agendamento',
    content: '../pages/salas-disponiveis',
    cssFile: 'salas-disponiveis.css',
    horario: horario
  });
});

// Rota de informações de agendamento
router.get('/informacoes-agendamento', (req, res) => {
  const horario = req.query.horario || '13:00';
  const sala = req.query.sala || 'R03';
  res.render('layout/main', {
    pageTitle: 'Informações de Agendamento - Sistema de Agendamento',
    content: '../pages/informacoes-agendamento',
    cssFile: 'informacoes-agendamento.css',
    horario: horario,
    sala: sala
  });
});

// Rota de agendamentos (sala agendada)
router.get('/agendamentos', (req, res) => {
  // Aqui você pode buscar os agendamentos do banco de dados
  // Por enquanto, vamos usar a sessão para simular persistência
  const agendamentos = (req.session && req.session.agendamentos) ? req.session.agendamentos : [];
  
  res.render('layout/main', {
    pageTitle: 'Sala Agendada - Sistema de Agendamento',
    content: '../pages/sala-agendada',
    cssFile: 'sala-agendada.css',
    agendamentos: agendamentos
  });
});

// Rota de suporte
router.get('/suporte', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Suporte - Sistema de Agendamento',
    content: '../pages/suporte',
    cssFile: 'suporte.css'
  });
});

// Rota para processar agendamento
router.post('/agendar', (req, res) => {
  const { horario, sala, nome, turma, grupo } = req.body;
  
  // Aqui você salvaria no banco de dados
  console.log('Novo agendamento:', { horario, sala, nome, turma, grupo });
  
  // Simular que o agendamento foi salvo e agora temos agendamentos
  // Em uma implementação real, você buscaria do banco de dados
  req.session = req.session || {};
  req.session.agendamentos = req.session.agendamentos || [];
  req.session.agendamentos.push({
    id: Date.now(),
    horario,
    sala,
    nome,
    turma,
    grupo
  });
  
  // Redireciona para a página de agendamentos
  res.redirect('/agendamentos');
});

// Rota para processar suporte
router.post('/suporte/enviar', (req, res) => {
  const { sala, horario, descricao } = req.body;
  
  // Aqui você salvaria no banco de dados
  console.log('Nova solicitação de suporte:', { sala, horario, descricao });
  
  // Redireciona para a página de suporte com mensagem de sucesso
  res.redirect('/suporte?success=true');
});

module.exports = router;

