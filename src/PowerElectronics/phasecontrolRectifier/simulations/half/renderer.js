let chart1, chart2, chart3, chart4, chart5;
let chart1data = [], chart2data = [], chart3data = [], chart4data = [], chart5data = [];
let sliderVal;
let numPoints;
let piCycle = 6; // Default value, you can change this as needed

function generateChartData(sliderVal) {
  const amplitude = Math.sin(sliderVal * Math.PI / 100);

  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  // chart2data = Array.from({ length: numPoints }, (_, i) => {
  //   const xValue = (i * (piCycle * Math.PI) / (numPoints - 1)) + (sliderVal * 0.01 * Math.PI);
  //   const positionInCycle = xValue % Math.PI;
  //   return 0.5 - (positionInCycle / (Math.PI * 0.2));
  // });

  chart2data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;

    if (isOddCycle) {
      return Math.sin(xValue);
    } else {
      return 0;
    }
  });

  chart3data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
  
    if (isOddCycle) {
      const sliderPercentage = sliderVal / 100;
      const oddCycleRange = Math.PI * sliderPercentage;
  
      if (positionInCycle <= oddCycleRange) {
        return 0;
      } else {
        return Math.sin(xValue);
      }
    } else {
      return 0;
    }
  });

  chart4data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
  
    if (isOddCycle) {
      const sliderPercentage = sliderVal / 100;
      const oddCycleRange = Math.PI * sliderPercentage;
  
      if (positionInCycle <= oddCycleRange) {
        return 0;
      } else {
        return Math.sin(xValue);
      }
    } else {
      return 0;
    }
  });

  chart5data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;

    if (isOddCycle && (  positionInCycle / Math.PI < Math.max(0, sliderVal * 0.01))) {
      return Math.sin(xValue);
    } else if(!isOddCycle) {
      return Math.sin(xValue);
    } else {
      return 0
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
          min: -1,
          max: 1
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
    options: options
  });

  const chart3Ctx = chartCanvas[2].getContext('2d');
  chart3 = new Chart(chart3Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart3data,
          borderWidth: 2,
          borderColor: chartColors[3],
          fill: false
        }
      ]
    },
    options: options
  });

  const chart4Ctx = chartCanvas[3].getContext('2d');
  chart4 = new Chart(chart4Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart4data,
          borderWidth: 2,
          borderColor: chartColors[4],
          fill: false
        }
      ]
    },
    options: options
  });

  const chart5Ctx = chartCanvas[4].getContext('2d');
  chart5 = new Chart(chart5Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart5data,
          borderWidth: 2,
          borderColor: chartColors[5],
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
          min: -1,
          max: 1
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
  const chartCanvas3 = document.getElementById('chart3');
  const chartCanvas4 = document.getElementById('chart4');
  const chartCanvas5 = document.getElementById('chart5');
  numPoints = chartCanvas1.width;

  let chartCanvas = [chartCanvas1, chartCanvas2, chartCanvas3, chartCanvas4, chartCanvas5];
  generateChartData(0);
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
