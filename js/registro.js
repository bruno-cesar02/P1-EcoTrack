document.getElementById('registrarForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Coleta dos valores do formulário
  const agua = document.getElementById('agua').value;
  const energia = document.getElementById('energia').value;
  const residuos = document.getElementById('residuos').value;
  const transporte = document.getElementById('transporte').value;

  const registroData = { agua, energia, residuos, transporte };

  // Armazena os dados no localStorage (em formato JSON)
  localStorage.setItem('registroData', JSON.stringify(registroData));

  document.getElementById('feedback').textContent = 'Dados registrados com sucesso!';
  
  this.reset();

  setTimeout(function() {
    window.location.href = '/dashboard.html';
  }, 1500);
});
