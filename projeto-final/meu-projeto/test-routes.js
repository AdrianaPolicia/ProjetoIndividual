// Teste das rotas do sistema

const assert = require('assert');
const http = require('http');

// Função para fazer requisições HTTP
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Testes
async function runTests() {
  try {
    console.log('Iniciando testes...');
    
    // Teste da rota principal
    const mainRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    
    console.log('Rota principal:', mainRoute.statusCode);
    assert.strictEqual(mainRoute.statusCode, 302, 'A rota principal deve redirecionar para login');
    
    // Teste da rota de login
    const loginRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/login',
      method: 'GET'
    });
    
    console.log('Rota de login:', loginRoute.statusCode);
    assert.strictEqual(loginRoute.statusCode, 200, 'A rota de login deve retornar status 200');
    
    // Teste da rota de horários
    const horariosRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/horarios',
      method: 'GET'
    });
    
    console.log('Rota de horários:', horariosRoute.statusCode);
    assert.strictEqual(horariosRoute.statusCode, 200, 'A rota de horários deve retornar status 200');
    
    // Teste da rota de salas disponíveis
    const salasRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/salas-disponiveis?horario=13:00',
      method: 'GET'
    });
    
    console.log('Rota de salas disponíveis:', salasRoute.statusCode);
    assert.strictEqual(salasRoute.statusCode, 200, 'A rota de salas disponíveis deve retornar status 200');
    
    // Teste da rota de informações de agendamento
    const infoRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/informacoes-agendamento?horario=13:00&sala=R03',
      method: 'GET'
    });
    
    console.log('Rota de informações de agendamento:', infoRoute.statusCode);
    assert.strictEqual(infoRoute.statusCode, 200, 'A rota de informações de agendamento deve retornar status 200');
    
    // Teste da rota de agendamentos
    const agendamentosRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/agendamentos',
      method: 'GET'
    });
    
    console.log('Rota de agendamentos:', agendamentosRoute.statusCode);
    assert.strictEqual(agendamentosRoute.statusCode, 200, 'A rota de agendamentos deve retornar status 200');
    
    // Teste da rota de suporte
    const suporteRoute = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/suporte',
      method: 'GET'
    });
    
    console.log('Rota de suporte:', suporteRoute.statusCode);
    assert.strictEqual(suporteRoute.statusCode, 200, 'A rota de suporte deve retornar status 200');
    
    console.log('Todos os testes passaram!');
  } catch (error) {
    console.error('Erro nos testes:', error);
  }
}

// Executar os testes
runTests();

