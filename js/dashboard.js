document.addEventListener('DOMContentLoaded', function () {
  // Recupera os dados do registro (se houver)
  var registroData = localStorage.getItem('registroData');
  
  // Se não houver dados, define valores zerados para o gráfico
  var aguaChart = 0, energiaChart = 0, residuosChart = 0;
  
  if (registroData) {
    var dataRegistro = JSON.parse(registroData);
    aguaChart = parseFloat(dataRegistro.agua) || 0;
    energiaChart = parseFloat(dataRegistro.energia) || 0;
    residuosChart = parseFloat(dataRegistro.residuos) || 0;
  }

  // Inicializa o gráfico de barras (Chart.js) com os dados (ou zeros)
  var ctx = document.getElementById('metricsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Água', 'Energia', 'Resíduos'],
      datasets: [{
        label: 'Consumo (últimos 7 dias)',
        data: [aguaChart, energiaChart, residuosChart],
        backgroundColor: ['#BCDBE5', '#E7BC66', '#9BAD87'],
        borderColor: ['#BCDBE5', '#E7BC66', '#9BAD87'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Configuração do Modal de Ajuda
  var helpIcon = document.getElementById('helpIcon');
  var helpModal = document.getElementById('helpModal');
  var closeHelpModal = document.getElementById('closeHelpModal');

  helpIcon.addEventListener('click', function() {
    helpModal.style.display = 'block';
  });
  closeHelpModal.addEventListener('click', function() {
    helpModal.style.display = 'none';
  });
  window.addEventListener('click', function(event) {
    if (event.target === helpModal) {
      helpModal.style.display = 'none';
    }
  });

  // Atualiza a classificação e os indicadores recentes com base nos dados registrados
  var classificacaoElement = document.querySelector('.classificacao');
  if (!registroData) {
    classificacaoElement.textContent = 'Sem dados';
  } else {
    var data = JSON.parse(registroData);
    var agua = parseFloat(data.agua);
    var energia = parseFloat(data.energia);
    var residuos = parseFloat(data.residuos);
    var transporte = data.transporte;

    // Calcula os scores normalizados
    var sAgua = Math.min(agua / 200, 1);
    var sEnergia = Math.min(energia / 10, 1);
    var sResiduos = Math.min(residuos / 2, 1);
    
    // Mapeamento simples para o transporte
    var sTransporte = 1.0;
    if (transporte === "caminhada") {
      sTransporte = 0.0;
    } else if (transporte === "bicicleta") {
      sTransporte = 0.2;
    } else if (transporte === "carona_compartilhada") {
      sTransporte = 0.4;
    } else if (transporte === "transporte_publico") {
      sTransporte = 0.5;
    } else if (transporte === "carro_eletrico") {
      sTransporte = 0.7;
    } else if (transporte === "carro") {
      sTransporte = 1.0;
    }

    // Calcula o score total com pesos iguais
    var totalScore = 0.25 * (sAgua + sEnergia + sResiduos + sTransporte);

    // Classifica o score total
    var classification = "";
    if (totalScore <= 0.3) {
      classification = "Baixo Impacto";
    } else if (totalScore <= 0.6) {
      classification = "Médio Impacto";
    } else {
      classification = "Alto Impacto";
    }
    classificacaoElement.textContent = classification;

    // Atualiza os indicadores recentes (ordem: Água, Energia, Resíduos, Transporte)
    var cards = document.querySelectorAll('.indicator-card');
    if (cards.length >= 4) {
      cards[0].querySelector('p').textContent = agua + " L";
      cards[1].querySelector('p').textContent = energia + " kWh";
      cards[2].querySelector('p').textContent = residuos + " kg";
      
      // Mapeamento para tornar o transporte mais legível
      var transporteMap = {
        "transporte_publico": "Transporte Público",
        "bicicleta": "Bicicleta",
        "caminhada": "Caminhada",
        "carro": "Carro",
        "carro_eletrico": "Carro Elétrico",
        "carona_compartilhada": "Carona Compartilhada"
      };
      cards[3].querySelector('p').textContent = transporteMap[transporte] || transporte;
    }
  }
});
