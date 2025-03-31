document.getElementById('registrarForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Coleta dos valores do formulário
  const agua = document.getElementById('agua').value;
  const energia = document.getElementById('energia').value;
  const residuos = document.getElementById('residuos').value;
  const transporte = document.getElementById('transporte').value;

  // Cria um objeto com os dados
  const registroData = { agua, energia, residuos, transporte };

  // Armazena os dados no localStorage (em formato JSON)
  localStorage.setItem('registroData', JSON.stringify(registroData));

  // Exibe um feedback para o usuário
  document.getElementById('feedback').textContent = 'Dados registrados com sucesso!';
  
  // Opcional: limpa o formulário
  this.reset();

  // Opcional: redireciona para o dashboard após um pequeno delay
  setTimeout(function() {
    window.location.href = '/dashboard.html';
  }, 1500);
});
