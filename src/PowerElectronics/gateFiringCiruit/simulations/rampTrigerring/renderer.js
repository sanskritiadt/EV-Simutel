let chart1, chart2;
let chart1data = [], chart2data = [];
let sliderVal;
let numPoints;
let piCycle = 4; // Default value, you can change this as needed

function generateChartData(sliderVal) {
  const amplitude = Math.sin(sliderVal * Math.PI / 100);

  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const positionInCycle = xValue % Math.PI;
    
    if (positionInCycle >= 0.25 * Math.PI && positionInCycle <= 0.75 * Math.PI) {
      return Math.sin(0.25 * Math.PI);
    } else {
      return Math.abs(Math.sin(xValue));
    }
  });

   chart2data = Array.from({ length: numPoints }, (_, i) => {
    const spikeWidth = Math.PI * 0.1; // Fixed spike width
    const spikeHeight = 0.4; // Height of the spike from the baseline
     const frequencyFactor = 1 + Math.floor(2 * sliderVal / 100); // Ranges from 1 to 3
     const xValue = (i * (piCycle * Math.PI) / (numPoints - 1));
     const positionInCycle = xValue % (Math.PI / frequencyFactor);
     
     if (positionInCycle < spikeWidth) {
       return spikeHeight - (positionInCycle / spikeWidth) * spikeHeight;
     } else {
       return 0;
     }
   });

}

function updateChart(chartCanvas, titles) {
  let chartColors = ['rgba(153, 102, 255, 1)', 'rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 153, 0, 1)', 'rgba(153, 102, 255, 1)'];
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    animation: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: piCycle * Math.PI,
        ticks: {
          stepSize: Math.PI,
          callback: function (value, index, values) {
            return index + 'π';
          }
        }
      },
      y: {
        display: true,
        type: 'linear',
        position: 'left',
        min: -0.01,
        max: 1.00001
      }
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0.5
      }
    }
  };

  const chart1Ctx = chartCanvas[0].getContext('2d');
  chart1 = new Chart(chart1Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart1data,
          borderWidth: 2,
          borderColor: chartColors[0],
          fill: false
        }
      ]
    },
    options: {
      ...options,
      scales: {
        ...options.scales,
        y: {
          ...options.scales.y,
          min: 0,
          max: 1,
          title: {
            display: true,
            text: titles[0]
          }
        }
      }
    }
  });
  

  const chart2Ctx = chartCanvas[1].getContext('2d');
  chart2 = new Chart(chart2Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart2data,
          borderWidth: 2,
          borderColor: chartColors[2],
          fill: false
        }
      ]
    },
    options: {
      ...options,
      scales: {
        ...options.scales,
        y: {
          ...options.scales.y,
          title: {
            display: true,
            text: titles[1]
          }
        }
      }
    }
  });

}

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  const chartCanvas1 = document.getElementById('chart1');
  const chartCanvas2 = document.getElementById('chart2');

  numPoints = chartCanvas1.width;

  let chartCanvas = [chartCanvas1, chartCanvas2];
  let titles = ["Vz", "Pulse Voltage"]
  generateChartData(0);
  updateChart(chartCanvas, titles);

  slider.addEventListener('input', () => {
    sliderVal = parseInt(slider.value);
    sliderValue.innerText = 180 - parseInt(sliderVal * 0.01 * 180);

    generateChartData(sliderVal);
    chart1.destroy();
    chart2.destroy();

    updateChart(chartCanvas,titles);
  });
});