let chart1, chart2, chart3, chart4, chart5;
let chart1data = [], chart2data = [], chart3data = [], chart4data = [], chart5data = [];
let sliderVal;
let numPoints;
let piCycle = 9.1;

function generateChartData(sliderVal) {
  const amplitude = Math.sin(sliderVal * Math.PI / 100);

  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  chart2data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (9.5 * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;

    if (isOddCycle && sliderVal >= 0 && sliderVal <= 50) {
      const decreaseFactor = (50 - sliderVal) / 50;
      return (1 - decreaseFactor) * Math.sin(xValue) / 2.5;
    }
  else{
    if (isOddCycle && (sliderVal < 50 || 1 - (positionInCycle / Math.PI) < Math.max(0, (sliderVal-11.25) * 0.01))) {
      return sliderVal > 50 ? 0 : (Math.sin(xValue)/2.5);
    }
    if(isOddCycle == 0){
      return 0;
    }
    else {
      return (Math.sin(xValue)/2.5);
    }
  }
  });

  chart3data = Array.from({ length: numPoints }, (_, i) => {
    if (sliderVal <= 50) {
      return 0;
    } else {
      const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
      const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
      const positionInCycle = xValue % Math.PI;

      if (isOddCycle && (sliderVal < 50 || 1 - (positionInCycle / Math.PI) > Math.max(0, (sliderVal - 11.25) * 0.01))) {
        return sliderVal > 50 ? 0 : Math.sin(xValue);
      }
      if (isOddCycle === 0) {
        return 0;
      } else {
        return Math.sin(xValue);
      }
    }
  });

  chart4data = Array.from({ length: numPoints }, (_, i) => {
    if (sliderVal <= 50) {
      return 0;
    } else {
      const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
      const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
      const positionInCycle = xValue % Math.PI;

      if (isOddCycle && (sliderVal < 50 || 1 - (positionInCycle / Math.PI) > Math.max(0, (sliderVal - 11.25) * 0.01))) {
        return sliderVal > 50 ? 0 : (Math.sin(xValue) / 2.5);
      }
      if (isOddCycle === 0) {
        return 0;
      } else {
        return (Math.sin(xValue) / 2.5);
      }
    }
  });

  chart5data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;

    if (isOddCycle && (sliderVal < 50 || 1 - (positionInCycle / Math.PI) < Math.max(0, (sliderVal - 11.25) * 0.01))) {
      return sliderVal > 50 ? 0 : Math.sin(xValue);
    } else {
      return Math.sin(xValue);
    }
  });
}

function updateChart(chartCanvas) {
  let chartColors = ['rgba(153, 102, 255, 1)', 'rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 153, 0, 1)'];
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
        min: -1,
        max: 1,
      },
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0.5
      }
    },
  };

  const createChart = (ctx, data, color, title) => {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
        datasets: [{
          data: data,
          borderWidth: 2,
          borderColor: color,
          fill: false,
        }]
      },
      options: {
        ...options,
        scales: {
          ...options.scales,
          y: {
            ...options.scales.y,
            title: {
              display: true,
              text: title
            }
          }
        }
      }
    });
  };

  chart1 = createChart(chartCanvas[0].getContext('2d'), chart1data, chartColors[0], 'Vs');
  chart2 = createChart(chartCanvas[1].getContext('2d'), chart2data, chartColors[1], 'Vg');
  chart3 = createChart(chartCanvas[2].getContext('2d'), chart3data, chartColors[2], 'Vo');
  chart4 = createChart(chartCanvas[3].getContext('2d'), chart4data, chartColors[3], 'Io');
  chart5 = createChart(chartCanvas[4].getContext('2d'), chart5data, chartColors[4], 'Vt');
}

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  const chartCanvas1 = document.getElementById('chart1');
  const chartCanvas2 = document.getElementById('chart2');
  const chartCanvas3 = document.getElementById('chart3');
  const chartCanvas4 = document.getElementById('chart4');
  const chartCanvas5 = document.getElementById('chart5');
  numPoints = chartCanvas1.width;

  let chartCanvas = [chartCanvas1, chartCanvas2, chartCanvas3, chartCanvas4, chartCanvas5];

  generateChartData(50);
  updateChart(chartCanvas);

  slider.addEventListener('input', () => {
    sliderVal = parseInt(slider.value);
    sliderValue.innerText = 180 - parseInt(sliderVal * 0.01 * 180);

    generateChartData(sliderVal);
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    chart4.destroy();
    chart5.destroy();

    updateChart(chartCanvas);
  });
});