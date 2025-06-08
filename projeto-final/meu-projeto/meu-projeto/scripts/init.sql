-- Tabela de usuários
CREATE TABLE if not exists usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    turma VARCHAR(20),
    grupo VARCHAR(20)
);

-- Tabela de salas
CREATE TABLE  if not exists salas (
    id SERIAL PRIMARY KEY,
    numero_sala VARCHAR(10) UNIQUE NOT NULL  -- Exemplo: 'R07'
);

-- Tabela de horários disponíveis (pré-gerada, de 8:00 até 20:00, em blocos de 30 min)
CREATE TABLE if not exists horarios (
    id SERIAL PRIMARY KEY,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL
);

-- Tabela de agendamentos
CREATE TABLE  if not exists agendamentos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    horario_id INTEGER REFERENCES horarios(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de reclamações
CREATE TABLE  if not exists reclamacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    sala_id INTEGER REFERENCES salas(id),
    horario_id INTEGER REFERENCES horarios(id),
    data DATE NOT NULL,
    descricao TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
