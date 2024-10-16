let chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8;
let chart1data = [], chart2data = [], chart3data = [], chart4data = [], chart5data = [], chart6data = [], chart7data = [] ,chart8data =[];
let sliderVal;
let numPoints;
let piCycle = 6; // Default value, you can change this as needed

function generateChartData(sliderVal) {
  const amplitude = Math.sin(sliderVal * Math.PI / 100)

  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  chart2data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  chart3data = Array.from({ length: numPoints }, (_, i) => {
    const broadeningFactor = (sliderVal + 10) * 0.01; // Adjust the broadening factor based on the slider value
    const spikeWidth = broadeningFactor * Math.PI*5; // Calculate spike width dynamically based on the slider value
    
    const xOffset = Math.PI*0.5; // Offset to center the spike
    const xValue = (i * (piCycle * Math.PI) / (numPoints))+xOffset; // Calculate xValue
    const isOddCycle = Math.floor(xValue / Math.PI) %2=== 0;
    const positionInCycle = Math.abs(xValue) % Math.PI; // Ensure positionInCycle is positive
    

    
    
    if ( !isOddCycle && positionInCycle >= Math.PI/2  - spikeWidth / 2 && positionInCycle <= Math.PI / 2 + spikeWidth / 2) {
        return 0.8;
    } else {
        return 0;
    }
    
  });

  chart4data = Array.from({ length: numPoints }, (_, i) => {
    const broadeningFactor = (sliderVal ) * 0.01; // Adjust the broadening factor based on the slider value
    const spikeWidth = broadeningFactor * Math.PI; // Calculate spike width dynamically based on the slider value
    
    const xOffset = Math.PI*0.5; // Offset to center the spike
    const xValue = (i * (piCycle * Math.PI) / (numPoints))+xOffset; // Calculate xValue
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = Math.abs(xValue) % Math.PI; // Ensure positionInCycle is positive
    
    if (isOddCycle && positionInCycle > Math.PI / 2 ) {
        return 0.8;
    } else {
        return 0;
    }
  });

  chart5data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = (i * (piCycle * Math.PI) / (numPoints - 1)) - (sliderVal * 0.01 * Math.PI);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    if (!isOddCycle && positionInCycle > 0 && positionInCycle < (0.10 * Math.PI)) {
        return 0.8;
    } else {
        return 0;
    }
  });

  chart6data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = (i * (piCycle * Math.PI) / (numPoints - 1)) - (sliderVal * 0.01 * Math.PI);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    if (isOddCycle && positionInCycle > 0 && positionInCycle < (0.10 * Math.PI)) {
        return 0.8;
    } else {
        return 0;
    }
  });

  chart7data = Array.from({ length: numPoints }, (_, i) => {
    const xOffset =Math.PI/2;
    const xValue = (i * (piCycle * Math.PI) / (numPoints - 1)) + (sliderVal * 0.01 * Math.PI * 0.5)-xOffset;
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    if (isOddCycle && positionInCycle > 0 && positionInCycle < (3 * Math.PI)) {
        return 0.8;
    } else {
        return 0;
    }
  });


  chart8data = Array.from({ length: numPoints }, (_, i) => {
    const xOffset =Math.PI/2;
    const xValue = (i * (piCycle * Math.PI) / (numPoints - 1)) + (sliderVal * 0.01 * Math.PI*0.5)+xOffset;
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    if (isOddCycle && positionInCycle > 0 && positionInCycle < (3 * Math.PI)) {
        return 0.8;
    } else {
        return 0;
    }
  });


}

function updateChart(chartCanvas) {
  let chartColors = [
    'rgba(153, 102, 255, 1)', 
    'rgba(0, 123, 255, 1)', 
    'rgba(255, 99, 132, 1)', 
    'rgba(75, 192, 192, 1)',
    'rgba(200, 153, 0, 1)',
    'rgba(204, 0, 204, 1)',    // Added: Purple
    'rgba(0, 204, 102, 1)',
    'rgba(0, 123, 255, 1)'    
  ];
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
        max: 1
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
          data: chart1data,
          borderWidth: 2,
          borderColor: chartColors[1],
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

  const chart3Ctx = chartCanvas[2].getContext('2d');
  chart3 = new Chart(chart3Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart3data,
          borderWidth: 2,
          borderColor: chartColors[2],
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
          borderColor: chartColors[3],
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
          borderColor: chartColors[4],
          fill: false
        }
      ]
    },
    options: options
  });

  const chart6Ctx = chartCanvas[5].getContext('2d');
  chart6 = new Chart(chart6Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart6data,
          borderWidth: 2,
          borderColor: chartColors[5],
          fill: false
        }
      ]
    },
    options: options
  });

  const chart7Ctx = chartCanvas[6].getContext('2d');
  chart7 = new Chart(chart7Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart7data,
          borderWidth: 2,
          borderColor: chartColors[6],
          fill: false
        }
      ]
    },
    options: options
  });

  const chart8Ctx = chartCanvas[7].getContext('2d');
  chart8 = new Chart(chart8Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data: chart8data,
          borderWidth: 2,
          borderColor: chartColors[7],
          fill: false
        }
      ]
    },
    options: options
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
  const chartCanvas6 = document.getElementById('chart6');
  const chartCanvas7 = document.getElementById('chart7');
  const chartCanvas8 = document.getElementById('chart8');
  numPoints = chartCanvas1.width;

  let chartCanvas = [chartCanvas1, chartCanvas2, chartCanvas3, chartCanvas4, chartCanvas5, chartCanvas6, chartCanvas7, chartCanvas8];
  generateChartData(0);
  updateChart(chartCanvas);
  slider.addEventListener('input', () => {
    sliderVal = parseInt(slider.value);
    sliderValue.innerText =  parseInt(sliderVal * 0.01 * 180);

    generateChartData(sliderVal);
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    chart4.destroy();
    chart5.destroy();
    chart6.destroy();
    chart7.destroy();
    chart8.destroy();

    updateChart(chartCanvas);
  });
});
