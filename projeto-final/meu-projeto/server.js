const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar JSON e form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sessão
app.use(session({
  secret: 'sistema-agendamento-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const routes = require('./routes/index');
app.use('/', routes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/agendamento', agendamentoRoutes);

const horarioRoutes = require('./routes/horarioRoutes');
app.use('/horario', horarioRoutes);

const salaRoutes = require('./routes/salaRoutes');
app.use('/sala', salaRoutes);

const reclamacaoRoutes = require('./routes/reclamacaoRoutes');
app.use('/reclamacao', reclamacaoRoutes);

// Inicializa o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

