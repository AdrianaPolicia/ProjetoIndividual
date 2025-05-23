const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

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
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});