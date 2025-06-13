// Arquivo principal de JavaScript para o sistema de agendamento

// Função para fazer requisições fetch com tratamento de erro
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Função para carregar horários disponíveis
async function carregarHorarios() {
  try {
    const horarios = await fetchAPI('/horario');
    const container = document.querySelector('.horarios-grid');
    
    if (container && horarios) {
      container.innerHTML = '';
      horarios.forEach(horario => {
        const horarioElement = document.createElement('div');
        horarioElement.className = 'horario-item';
        horarioElement.innerHTML = `
          <a href="/salas-disponiveis?horario=${horario.hora}" class="horario-link">
            ${horario.hora}
          </a>
        `;
        container.appendChild(horarioElement);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar horários:', error);
  }
}

// Função para carregar salas disponíveis
async function carregarSalasDisponiveis(horario) {
  try {
    const salas = await fetchAPI(`/sala/disponiveis?horario=${horario}`);
    const container = document.querySelector('.salas-grid');
    
    if (container && salas) {
      container.innerHTML = '';
      salas.forEach(sala => {
        const salaElement = document.createElement('div');
        salaElement.className = 'sala-item';
        salaElement.innerHTML = `
          <a href="/informacoes-agendamento?horario=${horario}&sala=${sala.numero}" class="sala-link">
            <div class="sala-icon">${sala.tipo === 'normal' ? '🏠' : '🚪'}</div>
            <div class="sala-nome">${sala.numero}</div>
          </a>
        `;
        container.appendChild(salaElement);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  }
}

// Função para enviar agendamento
async function enviarAgendamento(formData) {
  try {
    // Criar FormData para envio como form-data
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    
    const response = await fetch('/agendar', {
      method: 'POST',
      body: form
    });
    
    if (response.ok) {
      alert('Agendamento realizado com sucesso!');
      window.location.href = '/agendamentos';
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (error) {
    console.error('Erro ao enviar agendamento:', error);
    alert('Erro ao realizar agendamento. Tente novamente.');
  }
}

// Função para carregar agendamentos do usuário
async function carregarAgendamentos(usuarioId = 1) {
  try {
    const agendamentos = await fetchAPI(`/agendamento/user/${usuarioId}`);
    const container = document.querySelector('.agendamentos-list');
    
    if (container && agendamentos) {
      container.innerHTML = '';
      agendamentos.forEach(agendamento => {
        const agendamentoElement = document.createElement('div');
        agendamentoElement.className = 'agendamento-card';
        agendamentoElement.innerHTML = `
          <div class="agendamento-info">
            <div class="horario-info">
              <span class="horario">${agendamento.horario}</span>
            </div>
            <div class="sala-info">
              <span class="sala">${agendamento.sala}</span>
            </div>
            <div class="cancelar-btn">
              <button onclick="cancelarAgendamento('${agendamento.id}')" class="btn-cancelar">✕</button>
            </div>
          </div>
        `;
        container.appendChild(agendamentoElement);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
  }
}

// Função para cancelar agendamento
async function cancelarAgendamento(id) {
  const modal = document.getElementById('modal-cancelar');
  if (modal) {
    modal.style.display = 'flex';
    window.agendamentoIdParaCancelar = id;
  }
}

// Função para confirmar cancelamento
async function confirmarCancelamento() {
  const id = window.agendamentoIdParaCancelar;
  if (id) {
    try {
      const result = await fetchAPI(`/agendamento/${id}`, {
        method: 'DELETE'
      });
      
      if (result.success) {
        alert('Agendamento cancelado com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao cancelar agendamento');
      }
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento');
    }
  }
  fecharModal();
}

// Função para fechar modal
function fecharModal() {
  const modal = document.getElementById('modal-cancelar');
  if (modal) {
    modal.style.display = 'none';
  }
  window.agendamentoIdParaCancelar = null;
}

// Função para enviar suporte
async function enviarSuporte(formData) {
  try {
    // Criar FormData para envio como form-data
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    
    const response = await fetch('/suporte/enviar', {
      method: 'POST',
      body: form
    });
    
    if (response.ok) {
      alert('Solicitação de suporte enviada com sucesso!');
      document.querySelector('.suporte-form').reset();
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (error) {
    console.error('Erro ao enviar suporte:', error);
    alert('Erro ao enviar solicitação. Tente novamente.');
  }
}

// Event listeners para formulários
document.addEventListener('DOMContentLoaded', function() {
  // Formulário de agendamento
  const agendamentoForm = document.querySelector('.agendamento-form');
  if (agendamentoForm) {
    agendamentoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      enviarAgendamento(data);
    });
  }
  
  // Formulário de suporte
  const suporteForm = document.querySelector('.suporte-form');
  if (suporteForm) {
    suporteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      enviarSuporte(data);
    });
  }
  
  // Carregar dados específicos da página
  const currentPath = window.location.pathname;
  
  if (currentPath === '/horarios') {
    carregarHorarios();
  } else if (currentPath === '/salas-disponiveis') {
    const urlParams = new URLSearchParams(window.location.search);
    const horario = urlParams.get('horario');
    if (horario) {
      carregarSalasDisponiveis(horario);
    }
  } else if (currentPath === '/agendamentos') {
    carregarAgendamentos();
  }
});

