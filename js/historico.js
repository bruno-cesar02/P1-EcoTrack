document.addEventListener('DOMContentLoaded', function() {
  const tabelaBody = document.querySelector('table tbody');
  const linhasOriginais = Array.from(tabelaBody.querySelectorAll('tr'));
  
  // Monta o array de registros com um ID único para cada linha
  const registrosOriginais = linhasOriginais.map((linha, index) => {
    const celulas = linha.querySelectorAll('td');
    return {
      id: index,
      dados: {
        data: celulas[0].textContent.trim(),
        agua: parseFloat(celulas[1].textContent),
        energia: parseFloat(celulas[2].textContent.replace(',', '.')),
        residuos: parseFloat(celulas[3].textContent.replace(',', '.')),
        transporte: celulas[4].textContent.trim(),
        classificacao: celulas[5].textContent.trim()
      }
    };
  });
  
  // Usamos uma cópia que será modificada para simular as alterações no “banco de dados”
  let registros = [...registrosOriginais];
  
  // Opções permitidas para transporte
  const transportesPermitidos = [
    "Transporte Público",
    "Bicicleta",
    "Caminhada",
    "Carro",
    "Carro Elétrico",
    "Carona Compartilhada"
  ];

  // Função para renderizar a tabela com os registros fornecidos
  function renderTable(registrosParaRender) {
      tabelaBody.innerHTML = '';
      registrosParaRender.forEach(record => {
         const tr = document.createElement('tr');
         tr.dataset.id = record.id;
         
         const tdData = document.createElement('td');
         tdData.textContent = record.dados.data;
         tr.appendChild(tdData);
         
         const tdAgua = document.createElement('td');
         tdAgua.textContent = record.dados.agua;
         tr.appendChild(tdAgua);
         
         const tdEnergia = document.createElement('td');
         // Substitui ponto por vírgula para exibição
         tdEnergia.textContent = record.dados.energia.toString().replace('.', ',');
         tr.appendChild(tdEnergia);
         
         const tdResiduos = document.createElement('td');
         tdResiduos.textContent = record.dados.residuos.toString().replace('.', ',');
         tr.appendChild(tdResiduos);
         
         const tdTransporte = document.createElement('td');
         tdTransporte.textContent = record.dados.transporte;
         tr.appendChild(tdTransporte);
         
         const tdClassificacao = document.createElement('td');
         tdClassificacao.textContent = record.dados.classificacao;
         tr.appendChild(tdClassificacao);
         
         // Cria a célula de ações com botões de editar e apagar
         const tdActions = document.createElement('td');
         tdActions.innerHTML = '<button class="btn-edit">Editar</button> <button class="btn-delete">Apagar</button>';
         tr.appendChild(tdActions);
         
         tabelaBody.appendChild(tr);
      });
  }

  // Função para aplicar os filtros e ordenações (mantida a lógica original)
  function aplicarFiltros(event) {
    if (event) event.preventDefault();
    
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const ordenarPor = document.getElementById('ordenar').value;
    
    let registrosFiltrados = registros.filter(record => {
      const dataRegistro = new Date(record.dados.data);
      const filtroInicio = dataInicio ? new Date(dataInicio) : null;
      const filtroFim = dataFim ? new Date(dataFim) : null;
      
      if (filtroInicio && dataRegistro < filtroInicio) return false;
      if (filtroFim && dataRegistro > filtroFim) return false;
      return true;
    });
    
    registrosFiltrados.sort((a, b) => {
      const dataA = new Date(a.dados.data);
      const dataB = new Date(b.dados.data);
      switch(ordenarPor) {
        case 'data_asc':
          return dataA - dataB;
        case 'agua':
          return b.dados.agua - a.dados.agua;
        case 'energia':
          return b.dados.energia - a.dados.energia;
        case 'residuos':
          return b.dados.residuos - a.dados.residuos;
        case 'classificacao':
          const ordem = { 'Baixo Impacto': 1, 'Médio Impacto': 2, 'Alto Impacto': 3 };
          return ordem[b.dados.classificacao] - ordem[a.dados.classificacao];
        default:
          return dataB - dataA;
      }
    });
    
    renderTable(registrosFiltrados);
    
    document.getElementById('semRegistros').style.display = 
      registrosFiltrados.length === 0 ? 'block' : 'none';
  }
  
  document.getElementById('filtroForm').addEventListener('submit', aplicarFiltros);

  // Delegação de eventos para os botões de editar e apagar
  tabelaBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
      // Função de exclusão
      const row = e.target.closest('tr');
      const id = parseInt(row.dataset.id);
      if (confirm('Deseja realmente apagar este registro?')) {
         registros = registros.filter(record => record.id !== id);
         aplicarFiltros();
      }
    } else if (e.target.classList.contains('btn-edit')) {
      // Função de edição (a data e o impacto não poderão ser editados)
      const row = e.target.closest('tr');
      const id = parseInt(row.dataset.id);
      const record = registros.find(record => record.id === id);
      if (!record) return;
      
      // Solicita os novos valores via prompt (simulação) com validação para números
      const novaAguaStr = prompt('Digite o novo consumo de água (L):', record.dados.agua);
      if (novaAguaStr === null) return;
      const novaAgua = parseFloat(novaAguaStr);
      if (isNaN(novaAgua) || novaAgua < 0) {
          alert('Valor inválido para água. Deve ser um número não negativo.');
          return;
      }
      
      const novaEnergiaStr = prompt('Digite o novo consumo de energia (kWh):', record.dados.energia);
      if (novaEnergiaStr === null) return;
      const novaEnergia = parseFloat(novaEnergiaStr);
      if (isNaN(novaEnergia) || novaEnergia < 0) {
          alert('Valor inválido para energia. Deve ser um número não negativo.');
          return;
      }
      
      const novaResiduosStr = prompt('Digite a nova quantidade de resíduos (kg):', record.dados.residuos);
      if (novaResiduosStr === null) return;
      const novaResiduos = parseFloat(novaResiduosStr);
      if (isNaN(novaResiduos) || novaResiduos < 0) {
          alert('Valor inválido para resíduos. Deve ser um número não negativo.');
          return;
      }
      
      const novoTransporte = prompt(
        'Digite o novo meio de transporte (opções: Transporte Público, Bicicleta, Caminhada, Carro, Carro Elétrico, Carona Compartilhada):',
        record.dados.transporte
      );
      if (novoTransporte === null) return;
      if (!transportesPermitidos.includes(novoTransporte)) {
          alert('Valor inválido para transporte. Opções permitidas: ' + transportesPermitidos.join(', '));
          return;
      }
      
      // Atualiza os dados do registro (data e impacto permanecem inalterados)
      record.dados.agua = novaAgua;
      record.dados.energia = novaEnergia;
      record.dados.residuos = novaResiduos;
      record.dados.transporte = novoTransporte;
      
      aplicarFiltros();
    }
  });

  // Renderização inicial da tabela
  aplicarFiltros();
});
