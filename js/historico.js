document.addEventListener('DOMContentLoaded', function() {
  const tabela = document.querySelector('table tbody');
  const linhasOriginais = Array.from(tabela.querySelectorAll('tr'));
  
  // Armazena os dados originais (sem a coluna de recicláveis)
  const registrosOriginais = linhasOriginais.map(linha => {
    const celulas = linha.querySelectorAll('td');
    return {
      elemento: linha,
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

  // Função para aplicar filtros e ordenação
  function aplicarFiltros(event) {
    if (event) event.preventDefault();
    
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const ordenarPor = document.getElementById('ordenar').value;
    
    // Filtrar por intervalo de datas
    let registrosFiltrados = registrosOriginais.filter(({ dados }) => {
      const dataRegistro = new Date(dados.data);
      const filtroInicio = dataInicio ? new Date(dataInicio) : null;
      const filtroFim = dataFim ? new Date(dataFim) : null;
      
      if (filtroInicio && dataRegistro < filtroInicio) return false;
      if (filtroFim && dataRegistro > filtroFim) return false;
      return true;
    });
    
    // Ordenar os resultados filtrados
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
    
    // Atualizar a tabela
    tabela.innerHTML = '';
    registrosFiltrados.forEach(({ elemento }) => {
      tabela.appendChild(elemento.cloneNode(true));
    });
    
    document.getElementById('semRegistros').style.display = 
      registrosFiltrados.length === 0 ? 'block' : 'none';
  }
  
  document.getElementById('filtroForm').addEventListener('submit', aplicarFiltros);
  aplicarFiltros();
});
