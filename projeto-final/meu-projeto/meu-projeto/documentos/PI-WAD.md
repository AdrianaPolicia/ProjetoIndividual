# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Agendamento de Salas

#### Autor do projeto: Adriana Fernandes Polícia

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O sistema a ser desenvolvido nesse projeto individual terá a funcionalidade de agendar as salas para trabalho em grupo do Inteli por meio de uma aplicação web. Assim, seu objetivo é permitir que os usuários consigam visualizar as salas disponíveis, consultar os horários livres e reservar elas de forma mais simples e eficiente. Dessa forma, essa aplicação vai resolver problemas que os alunos do Inteli enfrentam diariamente ao buscar por salas disponíveis, pela falta de uma informação organizada e acessível sobre o agendamento dessas.  
Com isso, o sistema desenvolvido terá ferramentas que irão ajudar os alunos a se organizarem melhor. Nesse contexto, alguns mecanismos que farão parte desse aplicativo serão a habilidade de receber os pedidos de agendamento, verificar se a sala está disponível de acordo com sua disponibilidade de horários e permitir que o usuário cancele uma reserva. Tudo isso fará com que o aplicativo seja intuitivo e que funcione adequadamente para os alunos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

<div align="center"> <sub>Persona</sub><br> <img src="../assets/persona.jpeg" width="100%" alt="modelo"><br></div>

### 2.2. User Stories (Semana 01)

USO1 - Como aluno do Inteli, quero visualizar a lista de salas disponíveis, para que eu possa ver se tem alguma disponibilidade no horário que eu quero.

US02 - Como aluno do Inteli, quero reservar uma sala para um horário específico, para que eu possa garantir um espaço para os meus estudos.

US03 - Como aluno do Inteli, quero cancelar uma reserva feita, para que outra pessoa possa utilizar a sala caso eu não precise mais.

Explicação INVEST do US03: 
- Independent: A funcionalidade de cancelamento é independente da criação de uma nova reserva ou da visualização de salas, ou seja, pode ser desenvolvida e testada separadamente. 
- Negotiable: Os detalhes de como o cancelamento ocorre pode ser ajustado conforme a evolução do projeto
- Valuable: É muito importante para os alunos, pois libera a sala para outros alunos udarem.
- Estimable: É possível estimar o tempo e o esforço necessário para implementar essa funcionalidade.
- Small: O cancelamento de uma reserva é uma tarefa simples e pequena, que pode ser desenvolvida rapidamente.
- Testable: É fácil de testar e conferir se está dentro dos critérios estabelecidos.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

<div align="center"> <sub>Diagrama relacional do banco de dados completo:</sub><br> <img src="../assets/modelo-banco2.png" width="100%" alt="modelo"><br></div>

#### Entidades e Relacionamentos:

#### Usuários (`usuarios`)
Representam os usuários do sistema, ou seja, as pessoas que agendam as salas.

- Nome completo
- E-mail (único)
- Senha criptografada
- Turma
- Grupo

**Relacionamentos:**
- Um usuário pode fazer um único agendamento por vez
- Um usuário pode registrar várias reclamações

#### Salas (`salas`)
Representam as salas físicas disponíveis para reserva.

- Número/código da sala (ex: R07)

**Relacionamentos:**
- Uma sala pode estar presente em vários agendamentos
- Uma sala pode receber várias reclamações

#### Horários (`horarios`)
Blocos de tempo fixos de 30 minutos entre 08:00 e 20:00.

- Horário de início
- Horário de fim

**Relacionamentos:**
- Um horário pode estar presente em vários agendamentos
- Um horário pode ser referenciado em várias reclamações

#### Agendamentos (`agendamentos`)
Representam a reserva de uma sala feita por um usuário para um horário específico em uma data.
- Data da reserva
- Sala reservada
- Horário reservado
- Usuário responsável
- Data de criação do agendamento

**Relacionamentos:**
- Cada agendamento está vinculado a um usuário, uma sala e um horário
- Um usuário só pode ter um agendamento ativo por vez

#### Reclamações (`reclamacoes`)
Representam relatos de problemas com salas, como ar-condicionado, mesa, etc.

- Sala onde ocorreu o problema
- Horário em que a sala foi usada
- Data do uso
- Descrição do problema
- Usuário que reclamou

**Relacionamentos:**

- Cada reclamação está vinculada a um usuário, uma sala e um horário

#### Diagrama de estrutura do banco de dados:
<div align="center"> <sub>Diagrama de estrutura do banco de dados completo:</sub><br> <img src="../assets/modelo-banco.png" width="100%" alt="modelo"><br> <sup>Fonte: Desenvolvido por Adriana</sup> </div>

#### Modelo Físico com o Schema do BD
📥 [Schema SQL completo](../scripts/init.sql)


### 3.1.1 BD e Models (Semana 5)

O model é a parte do sistema responsável por representar e gerenciar os dados, fazendo a comunicação direta com o banco de dados. Ele define quais informações serão armazenadas, como, e permite realizar operações como buscar, criar, atualizar e deletar registros. No desenvolvimento web, o model ajuda a organizar o código, separando a parte dos dados das outras partes do sistema, como as regras de negócio e as rotas

### Models Implementados no Sistema Web
#### 1. UserModel (Usuário)
- Descrição: Representa os usuários do sistema.
- Atributos principais: id; nome_completo; email; senha_hash; turma; grupo
- Funções implementadas: listar todos os usuários; buscar usuário por ID; criar novo usuário; atualizar dados de um usuário; deletar usuário.
#### 2. SalaModel (Sala)
- Descrição: Representa as salas que podem ser reservadas.
- Atributos principais: id; numero_sala.
- Funções implementadas: listar todas as salas; buscar sala por ID; criar nova sala; atualizar informações da sala; deletar sala.
#### 3. HorarioModel (Horário)
- Descrição: Define os horários disponíveis para reserva.
- Atributos principais: id; horario_inicio; horario_fim
- Funções implementadas: listar todos os horários; buscar horário por ID; criar novo horário; atualizar horário; deletar horário.
#### 4. AgendamentoModel (Agendamento)
- Descrição: Gerencia os agendamentos feitos pelos usuários.
- Atributos principais: id; usuario_id; sala_id; horario_id; data; croado_em.
- Funções implementadas: listar todos os agendamentos; buscar agendamento por ID; criar novo agendamento; atualizar informações do agendamento; cancelar (deletar) agendamento.
#### 5. ReclamacaoModel (Reclamação)
- Descrição: Permite que usuários registrem reclamações relacionadas ao uso das salas ou do sistema.
- Atributos principais: id; usuario_id; sala_id; horario_id; data; descricao; criado_em.
- Funções implementadas: listar todas as reclamações; buscar reclamação por ID; registrar nova reclamação; atualizar reclamação; excluir reclamação.

Cada model segue a mesma estrutura de código base, implementando operações CRUD (Create, Read, Update, Delete) para sua respectiva tabela no banco de dados. Segue a estrutura base:



```javascript
const db = require('../config/db');

class User {
  static async getAllUsers() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  static async getUserById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createUser(data) {
    const result = await db.query(
      'INSERT INTO usuarios (nome_completo, email, senha_hash, turma, grupo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.nome_completo, data.email, data.senha_hash, data.turma, data.grupo]
    );
    return result.rows[0];
  }

  static async updateUser(id, data) {
    const result = await db.query(
      'UPDATE usuarios SET nome_completo = $1, email = $2, senha_hash = $3, turma = $4, grupo = $5 WHERE id = $6 RETURNING *',
      [data.nome_completo, data.email, data.senha_hash, data.turma, data.grupo, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;
```

### 3.2. Arquitetura (Semana 5)

Um diagrama de arquitetura é uma representação visual da estrutura de um sistema, que mostra como seus principais componentes estão organizados e como eles interagem entre si. Assim, abaixo é possível visualizar o diagrama de arquitetura deste projeto.

<div align="center"> <sub>Diagrama de Arquitetura:</sub><br> <img src="../assets/Arquitetura MVC (1).png" width="100%" alt="modelo"><br></div> 

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

- **Login:** esta será a primeira tela que o usuário vai ver ao entrar na aplicação, ao inserir seu email e senha e confirmar ele estará livre para navegar pelas próximas páginas. 
<div align="center"> <sub>Wireframe da tela de login:</sub><br> <img src="../assets/login.png" width="100%" alt="modelo"><br> </div>

- **Agendar Horários:** na parte de Agendar o usuário vai se deparar com todos o horários possíveis para reservar uma sala ao longo do dia.
<div align="center"> <sub>Wireframe da primeira tela de agendamento:</sub><br> <img src="../assets/agendar1.png" width="100%" alt="modelo"><br></div> 

- **Agendar Sala:** após selecionar um horário o usuário será direcionada para uma tela onde aparecerá as salas disponíveis (que não estão reservadas) nesse horário específico.
<div align="center"> <sub>Wireframe da segunda tela de agendamento:</sub><br> <img src="../assets/agendar2.png" width="100%" alt="modelo"><br></div> 

- **Informações de Agendamento:** após selecionar uma sala, o usuário terá que informar o seu nome completo, turma e grupo para que todas as informções sejam armazenadas e organizadas. 
<div align="center"> <sub>Wireframe da terceira tela de agendamento:</sub><br> <img src="../assets/agendar3.png" width="100%" alt="modelo"><br></div> 

- **Agendada:** nessa parte o usuário poderá ver a sala e o horário que agendou, além de poder cancelar caso não precise mais.
<div align="center"> <sub>Wireframe da tela da sala agendada:</sub><br> <img src="../assets/agendada.png" width="100%" alt="modelo"><br></div> 

- **Reclamações:** nessa aba o usuário poderá relatar qualquer problema que teve na sala, como por exemplo um erro no ar-condicionado, informando o número da sala, o horário de uso daquela sala e uma descrição do problema encontrado.
<div align="center"> <sub>Wireframe da primeira tela de reclamações:</sub><br> <img src="../assets/reclamacoes.png" width="100%" alt="modelo"><br></div>  

### 3.4. Guia de estilos (Semana 05)

O guia de estilos tem como objetivo padronizar o desenvolvimento de uma interface, garantindo uma experiência consistente, agradável e intuitiva para o usuário. Ele deve ser utilizado como referência no desenvolvimento e na manutenção da aplicação. Assim, esses foram os elementos utilizados no projeto:

<div align="center"> <sub>Mini Guia de Estilos:</sub><br> <img src="../assets/Mini Guia de Estilos.png" width="100%" alt="modelo"><br></div> 

#### Cores:
- Primária: #665390 (Roxo) — para elementos de destaque, como botões principais, barras de navegação e títulos ativos.


- Secundárias:
    - #000000 (Preto) — para textos principais.
    - #FFFFFF (Branco) — para fundos e textos sobre fundos escuros.
    - #D9D9D9 (Cinza Claro) — para divisores, botões secundários e fundos neutros.
    - #726F6F (Cinza Escuro) — para textos secundários, informações complementares e ícones menos relevantes.

#### Tipografia: 
- H1: títulos principais (como o nome da tela).
- H2: subtítulos ou seções importantes.
- H3 a H6: textos auxiliares, subtítulos menores e descrições.
- P: textos corridos, instruções e descrições detalhadas.

#### Ícones:
- Voltar (seta): retorna à tela anterior.
- Agendar (calendário): acessa a tela de seleção de horários.
- Agendada (olho): visualiza agendamentos já feitos.
- Suporte (ponto de exclamação): acessa a tela de contato para suporte.
- Salas de grupo (casa): indica salas destinadas a reuniões em grupo.
- Salas individuais (salinha pequena): indica salas para uso individual.
- Cancelar (X): cancela um agendamento feito.

#### Componentes e Navegação: 
- Botões: estão na cor primária (roxa) para ações principais e cinza claro para ações secundárias.
- Inputs: estão em fundo branco com bordas cinza claro para clareza e foco no preenchimento.
- Confirmações e Alertas: á a caixa modal (como na tela de cancelamento) com botões claros para "Sim" e "Não".

Para mais informações sobre o Layout Geral do projeto e uma visualização melhor, entre neste link: https://www.figma.com/design/cnJg4qv0v5QnYuTUXReWOh/ux?node-id=2065-197&m=dev&t=fm6ftigwHI33YodZ-1

### 3.5. Protótipo de alta fidelidade (Semana 05)
Um protótipo de alta fidelidade é uma representação visual e funcional muito próxima do produto final. Ele simula de forma realista tanto o design visual quanto a interatividade entre telas. Assim, abaixo é possível visualizar os protótipos deste projeto:

<div align="center"> <sub>Protótipo da tela de login:</sub><br> <img src="../assets/Login Protótipo.png" width="100%" alt="modelo"><br></div> 
A tela de Login é a porta de entrada do sistema, onde o usuário insere seu e-mail institucional e senha para acessar a plataforma. O design utiliza um card branco com cantos arredondados sobre uma imagem do campus do Inteli, criando uma conexão visual com o ambiente físico da instituição. O contraste entre o fundo e o card garante legibilidade, enquanto a simplicidade da interface reduz distrações, focando a atenção do usuário no preenchimento dos dados.

<div align="center"> <sub>Protótipo da primeira tela de agendamento:</sub><br> <img src="../assets/Agendar1 Protótipo.png" width="100%" alt="modelo"><br></div> 
Na tela Agendar1, o usuário escolhe o horário desejado para realizar a reserva da sala. Os horários são dispostos em botões grandes, claros e bem espaçados, organizados em uma grade limpa e intuitiva. Essa escolha de layout prioriza a facilidade de navegação e reduz a possibilidade de erros.

<div align="center"> <sub>Protótipo da segunda tela de agendamento:</sub><br> <img src="../assets/Agendar2 Protótipo.png" width="100%" alt="modelo"><br></div> 
A tela Agendar2 apresenta as salas disponíveis de acordo com o horário selecionado anteriormente. Cada sala é representada por um botão que combina um ícone sugestivo (como setas ou portas) e o código da sala, como R01 ou R03. O design aqui é minimalista, focando em oferecer uma escolha rápida e clara, facilitando a tomada de decisão do usuário sem gerar sobrecarga de informações.

<div align="center"> <sub>Protótipo da terceira tela de agendamento:</sub><br> <img src="../assets/Agendar3 Protótipo.png" width="100%" alt="modelo"><br></div> 
Na tela Agendar3, o usuário preenche as informações necessárias para finalizar o agendamento, como nome completo, turma e grupo. O layout é simples, com campos de entrada bem distribuídos e um botão de ação em roxo, que se destaca na interface. Essa abordagem torna o processo de confirmação de dados mais direto, intuitivo e eficiente, garantindo que os registros sejam feitos corretamente.

<div align="center"> <sub>Protótipo da primeira tela de agendada:</sub><br> <img src="../assets/Agendada1 Protótipo.png" width="100%" alt="modelo"><br></div> 
A tela Agendada1 funciona como um painel de visualização dos agendamentos já realizados. Nela, o usuário vê de forma clara a sala e o horário reservados, apresentados dentro de um card com fundo neutro e texto bem centralizado. Um botão de cancelamento, representado por um ícone de "X", fica visível, oferecendo controle direto sobre os agendamentos ativos.

<div align="center"> <sub>Protótipo da segunda tela de agendada:</sub><br> <img src="../assets/Agendada2 Protótipo.png" width="100%" alt="modelo"><br></div> 
A tela Agendada2 serve como uma etapa de confirmação para o cancelamento de uma reserva. Ela exibe uma pergunta clara — “Tem certeza que deseja cancelar?” — e apresenta dois botões, “Sim” e “Não”, bem destacados. Esse design direto tem como objetivo evitar que o usuário cometa erros acidentais, adicionando uma camada de segurança antes de realizar ações irreversíveis.

<div align="center"> <sub>Protótipo da tela de suporte:</sub><br> <img src="../assets/Suporte Protótipo.png" width="100%" alt="modelo"><br></div> 
A tela de Suporte oferece um formulário para que o usuário possa relatar problemas ou situações adversas, como mal uso das salas ou defeitos estruturais. O layout é bem organizado, com campos específicos para nome da sala, horário de uso e uma descrição do problema. A interface segue o mesmo padrão visual do sistema, mantendo a consistência e tornando o processo de comunicação ágil e claro.

Aqui está o link para acessar os protótipos pelo figma: https://www.figma.com/design/cnJg4qv0v5QnYuTUXReWOh/ux?node-id=2065-197&m=dev&t=fm6ftigwHI33YodZ-1

### 3.6. WebAPI e endpoints (Semana 05)

Um endpoint é o endereço de acesso a uma funcionalidade específica de uma aplicação web. Ele faz parte de uma URL e, junto com o método HTTP (GET, POST, PUT, DELETE), permite que o cliente envie e receba dados do servidor. Cada endpoint está ligado a uma ação, como listar informações, buscar um dado específico, criar, atualizar ou excluir registros no sistema. 

Endpoints Implementados no Sistema Web
#### 1. Usuários 
- Descrição: Gerencia os usuários do sistema.
- Endpoints:
    - GET /usuarios - Lista todos os usuários.
    - GET /usuarios/:id - Busca um usuário pelo ID.
    - POST /usuarios - Cria um novo usuário.
    - PUT /usuarios/:id - Atualiza os dados de um usuário existente.
    - DELETE /usuarios/:id - Remove um usuário do sistema.

#### 2. Salas 
- Descrição: Controla as salas disponíveis para reserva.
- Endpoints:
    - GET /salas - Lista todas as salas.
    - GET /salas/:id - Busca uma sala específica pelo ID.
    - POST /salas - Cadastra uma nova sala.
    - PUT /salas/:id - Atualiza os dados de uma sala.
    - DELETE /salas/:id - Exclui uma sala do sistema.

#### 3. Horários 
- Descrição: Gerencia os horários disponíveis para agendamentos.
- Endpoints:
    - GET /horarios - Lista todos os horários.
    - GET /horarios/:id - Busca um horário específico pelo ID.
    - POST /horarios - Cadastra um novo horário.
    - PUT /horarios/:id - Atualiza um horário existente.
    - DELETE /horarios/:id - Remove um horário do sistema.

#### 4. Agendamentos
- Descrição: Controla os agendamentos realizados pelos usuários.
- Endpoints:
    - GET /agendamentos - Lista todos os agendamentos.
    - GET /agendamentos/:id - Busca um agendamento específico pelo ID.
    - POST /agendamentos - Cria um novo agendamento.
    - PUT /agendamentos/:id → Atualiza os dados de um agendamento.
    - DELETE /agendamentos/:id - Cancela (exclui) um agendamento.

#### 5. Reclamações 
- Descrição: Permite aos usuários registrar reclamações sobre as salas ou o sistema.
- Endpoints:
    - GET /reclamacoes - Lista todas as reclamações.
    - GET /reclamacoes/:id - Busca uma reclamação específica pelo ID.
    - POST /reclamacoes - Cria uma nova reclamação.
    - PUT /reclamacoes/:id - Atualiza os dados de uma reclamação.
    - DELETE /reclamacoes/:id - Remove uma reclamação do sistema.

### 3.7 Interface e Navegação (Semana 07)

#### Estrutura do código frontend
O frontend foi desenvolvido utilizando EJS (Embedded JavaScript) como template engine para as views e CSS para a estilização. A estrutura de arquivos segue a organização MVC:
- views/layout/main.ejs: Layout principal que define a estrutura comum a todas as páginas (cabeçalho, rodapé, inclusão de CSS e scripts).
- views/layout/login_layout.ejs: Layout específico para a página de login, sem o cabeçalho de navegação.
- views/components/header.ejs: Componente reutilizável para o cabeçalho de navegação.
- views/pages/: Contém os arquivos EJS para cada página específica do sistema (login, horários, salas disponíveis, informações de agendamento, sala agendada, suporte).
- views/css/: Contém os arquivos CSS para estilização global (style.css) e específica de cada página (login.css, horarios.css, etc.).
- public/js/script.js: Arquivo JavaScript para interações no frontend e integração com o backend via Fetch API.

Cada tela do sistema foi desenvolvida para replicar o design dos protótipos, utilizando EJS para a estrutura HTML e CSS para a aparência. Abaixo, estão as principais telas e suas implementações:

#### 1. Tela de Login

<div align="center"> <sub>Tela de Login no site:</sub><br> <img src="../assets/loginsite.png" width="100%" alt="modelo"><br></div> 

+ Código views/pages/login.ejs:

```javascript
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login - Inteli</title>
  <link rel="stylesheet" href="/css/login.css" />
</head>
<body>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="/assetspublic/logointeli.png" alt="Logo Inteli" class="logo" />
      </div>
      <form action="/user/login" method="POST" class="login-form">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="exemplo@sou.inteli.edu.br" required />
        
        <label for="senha">Senha</label>
        <input type="password" name="senha" id="senha" placeholder="********" required />
        
        <% if (typeof error !== 'undefined') { %>
          <p class="erro"><%= error %></p>
        <% } %>

        <button type="submit">Confirmar</button>
      </form>
    </div>
  </div
```

+ Estilização (views/css/login.css):

```javascript
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: url("assetspublic/backgroundlogin.png") no-repeat center center fixed;
    background-size: cover;
  }
  
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-box {
    background-color: white;
    border-radius: 30px;
    width: 400px;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .login-header {
    background-color: #6c4bb6;
    padding: 30px 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin: -40px -40px 30px;
  }
  
  .logo {
    height: 40px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .login-form label {
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }
  
  .login-form input {
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 2px solid #ccc;
    font-size: 14px;
  }
  
  .login-form button {
    background-color: #6b5b95;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .login-form button:hover {
    background-color: #6b5b95;
  }
  
  .erro {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }
```
Esses dois códigos acima são um modelo do código que foi utilizado para todas as telas, cada uma com suas características específicas mas com o mesmo padrão e função.

#### 2. Tela de Horários

<div align="center"> <sub>Tela de Horários no site:</sub><br> <img src="../assets/horariossite.png" width="100%" alt="modelo"><br></div> 

#### 3. Tela de Salas Disponíveis

<div align="center"> <sub>Tela de Salas Disponíveis no site:</sub><br> <img src="../assets/salasdisponiveissite.png" width="100%" alt="modelo"><br></div> 

#### 4. Tela de Informações de Agendamento

<div align="center"> <sub>Tela de Informações de Agendamento no site:</sub><br> <img src="../assets/informacoesdeagendamentosite.png" width="100%" alt="modelo"><br></div> 

#### 5. Tela de Informações de Sala Agendada

<div align="center"> <sub>Tela de Sala Agendada no site:</sub><br> <img src="../assets/salaagendadasite.png" width="100%" alt="modelo"><br></div> 

#### 6. Tela de Cancelamento

<div align="center"> <sub>Tela de Cancelamento no site:</sub><br> <img src="../assets/cancelarsite.png" width="100%" alt="modelo"><br></div> 

#### 7. Tela de Suporte

<div align="center"> <sub>Tela de Suporte:</sub><br> <img src="../assets/suportesite.png" width="100%" alt="modelo"><br></div> 

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

Link do vídeo demontrativo do Sistema Web: https://drive.google.com/file/d/1RV5s96DRIVAtys5mcq6B4skezPj7xJXC/view?usp=sharing

#### Desenvolvimento do Sistema Web de Reserva de Salas
Este projeto teve como objetivo criar um sistema web completo para agendamento de salas, utilizando a arquitetura MVC e tecnologias como Node.js com Express, PostgreSQL, HTML/CSS/JS e EJS para renderização de telas.

**MVC (Model-View-Controller)**

O projeto segue o padrão MVC, que organiza o código em três partes:

- Model: Regras de negócio e acesso ao banco (ex.: modelos de usuários, salas e agendamentos).
- View: Telas e interfaces que os usuários interagem (HTML, CSS, JavaScript).
- Controller: Faz a ponte entre View e Model, recebendo requisições, processando dados e retornando respostas.

**Funcionalidades Entregues**

- Login: Autenticação de usuários com verificação no banco de dados.
- Agendamento (3 etapas):
- Agendar1: Escolha de data.
- Agendar2: Seleção de horário disponível.
- Agendar3: Seleção de sala e confirmação.
- Visualização de Agendamentos: Exibe reservas feitas pelo usuário, com opção de cancelamento.
- Suporte: Formulário para envio de reclamações.

**Backend e Banco de Dados**

A API REST foi desenvolvida com Express para permitir o agendamento e gerenciamento de reservas. O banco de dados PostgreSQL foi estruturado com as seguintes tabelas:

- usuarios: armazena nome, email, senha criptografada e turma do usuário.
- salas: define as salas disponíveis por número (ex: R07).
- horarios: contém horários pré-definidos de 30 em 30 minutos (08:00–20:00).
- magendamentos: registra a reserva vinculando usuário, sala, horário e data.
- reclamacoes: armazena mensagens enviadas via formulário de suporte.

Cada tabela possui relacionamentos com chave estrangeira e regras como ON, DELETE e CASCADE para manter a integridade dos dados.

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

#### Pontos Fortes
- Estrutura organizada com separação clara entre frontend, backend e banco de dados.
- Interface simples e direta, com telas bem definidas para cada etapa do agendamento.
- Uso de horários pré-definidos evita conflitos e facilita a seleção.
- Banco de dados relacional bem modelado, com integridade referencial.
- Projeto alinhado com boas práticas de desenvolvimento (MVC, REST, modularização).
- Entrega de um vídeo demonstrativo que facilita a avaliação do funcionamento.

#### Pontos a Melhorar
- Erro ao agendar: Atualmente, ao tentar confirmar um agendamento, aparece a mensagem "Erro ao realizar agendamento. Tente novamente.". É necessário revisar a rota POST de agendamento e validar o envio correto dos dados.
- Tela Agendada com dados fixos: Mesmo sem nenhum agendamento, a tela apresenta uma sala fixa. O ideal seria mostrar a mensagem "Nenhuma sala agendada" quando não houver reservas, e exibir as informações corretas apenas quando houver dados reais no banco.
- Erro no envio de suporte: A tentativa de envio de uma reclamação resulta em "Erro ao enviar solicitação. Tente novamente.". É preciso revisar o formulário e a rota de envio para garantir que os dados estão sendo recebidos corretamente e salvos no banco.

#### Ideias e Melhorias Futuras
- Corrigir os bugs listados acima para tornar o sistema plenamente funcional.
- Adicionar feedback visual (alertas ou mensagens de sucesso) após o envio de um agendamento ou reclamação.
- Implementar uma área administrativa para visualizar todos os agendamentos por sala e data.
- Melhorar o sistema de autenticação, incluindo recuperação de senha e validação de campos.
- Inserir indicadores visuais (cores ou ícones) para horários ocupados e disponíveis.
- Adicionar filtros de busca por sala, data ou horário na tela de visualização de agendamentos.
- Tornar o layout responsivo, permitindo o uso em dispositivos móveis com boa experiência.

## <a name="c5"></a>5. Referências

O projeto foi báseado na estética da faculdade Inteli, portanto a principal referência foi o site e a estética da faculdade. Aqui está o site: https://www.inteli.edu.br/
