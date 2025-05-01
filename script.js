let chart;

function drawChart(gbExcedentes) {
  const ctx = document.getElementById('grafico').getContext('2d');
  const labels = [];
  const data = [];

  // Gerar dados para o gráfico com base no valor de GB excedentes inserido
  // Vamos considerar valores de -gbExcedentes até +gbExcedentes
  for (let x = -Math.abs(gbExcedentes); x <= Math.abs(gbExcedentes); x++) {
    labels.push(x);
    data.push(0.5 * x + 20); // Função f(x) = 0,5x + 20
  }

  // Se o gráfico já existir, destrua o gráfico anterior
  if (chart) chart.destroy();

  // Criação do gráfico
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Custo Total (R$)',
        data: data,
        borderColor: '#00BCD4',
        backgroundColor: 'rgba(0,188,212,0.2)',
        fill: false,
        tension: 0,
        borderWidth: 2,
        pointRadius: 0 // Sem pontos visíveis
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Esconder a legenda
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `R$ ${context.parsed.y.toFixed(2)} para ${context.parsed.x} GB`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'GB Excedentes',
            color: '#000', // Cor do título
            font: { size: 14 }
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1, // Passo entre os valores
            min: -Math.abs(gbExcedentes),
            max: Math.abs(gbExcedentes),
            color: '#000', // Cor dos ticks
            font: { size: 12 }
          },
          grid: {
            color: '#ccc', // Cor das linhas de grade
            borderColor: '#000', // Cor da linha do eixo X
            borderWidth: 2, // Espessura da linha do eixo X
            lineWidth: 1
          }
        },
        y: {
          title: {
            display: true,
            text: 'Custo (R$)',
            color: '#000', // Cor do título
            font: { size: 14 }
          },
          beginAtZero: true,
          grid: {
            color: '#ccc', // Cor das linhas de grade
            borderColor: '#000', // Cor da linha do eixo Y
            borderWidth: 2, // Espessura da linha do eixo Y
            lineWidth: 1
          },
          ticks: {
            color: '#000', // Cor dos ticks
            font: { size: 12 }
          }
        }
      }
    }
  });
}

// Atualiza o gráfico sempre que o valor no campo de input mudar
document.getElementById('gbInput').addEventListener('input', function() {
  const gbValue = parseInt(this.value, 10);
  drawChart(gbValue); // Atualiza o gráfico com o valor inserido
});

// Desenha o gráfico inicial com o valor padrão de 0
drawChart(0);
