let chart1, chart2, chart3, chart4, chart5, chart6 ;
let chart1data = [], chart2data = [], chart3data = [], chart4data = [], chart5data = [], chart6data = [] ;
let sliderVal;
let numPoints;
let piCycle = 6; // Default value, you can change this as needed

function generateChartData(sliderVal) {
  const amplitude = Math.sin(((180 - sliderVal) / 180) * Math.PI);



  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  chart2data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (6 * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    return positionInCycle / Math.PI;
  });

  chart3data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (6 * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;
    
    if (isOddCycle &&  ((positionInCycle % (Math.PI)) / (Math.PI) ) > Math.max(0, sliderVal * 0.01)) {
        return 1;
    } else {
        return 0;
    }
  });

  chart4data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (6 * Math.PI) / (numPoints - 1);
    const isEvenCycle = Math.floor(xValue / Math.PI) % 2 !== 0;
    const positionInCycle = xValue % Math.PI;
    
    
    if (isEvenCycle && ((positionInCycle % (Math.PI)) / (Math.PI) ) > Math.max(0, sliderVal * 0.01)) {
        return 1; // Change happening in even positions
    } else {
        return 0; // No change in odd positions
    }
    
  });


chart5data = Array.from({ length: numPoints }, (_, i) => {
  const xValue = (i * (piCycle * Math.PI) / (numPoints )) - (sliderVal * 0.01 * Math.PI-Math.PI) - 0.5;
  const positionInCycle =  (xValue % Math.PI) - 2.7 ;
  const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
  if (isOddCycle && positionInCycle > 0 ) {
    return positionInCycle * 1.5;
} else {
    return 0;
}
});


chart6data = Array.from({ length: numPoints }, (_, i) => {
  const xValue = (i * (piCycle * Math.PI) / (numPoints )) - (sliderVal * 0.01 * Math.PI) - 0.5;
  const positionInCycle =  (xValue % Math.PI) - 2.7 ;
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    if (isOddCycle && positionInCycle > 0 ) {
      return positionInCycle * 1.5;
    } else {
      return 0;
  }
});




}

function updateChart(chartCanvas, titles) {
  let chartColors = ['rgba(153, 102, 255, 1)', 'rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 153, 0, 1)','rgba(0, 204, 102, 1)','rgba(0, 123, 255, 1)'];
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
        max: 1.00001,
        ticks: {
          display: false
        }
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
          title: {
            display: true,
            text: titles[1]
          }
        }
      }
    }
  });

  const chart3Ctx = chartCanvas[2].getContext('2d');
  chart3 = new Chart(chart3Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (6 * Math.PI) / (numPoints - 1)),
      datasets: [{
        data: chart3data,
        borderWidth: 2,
        borderColor: chartColors[2],
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
            text: titles[2]
          }
        }
      }
    }
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
    options: {
      ...options,
      scales: {
        ...options.scales,
        y: {
          ...options.scales.y,
          title: {
            display: true,
            text: titles[3]
          }
        }
      }
    }
  });

   const chart5Ctx = chartCanvas[4].getContext('2d');
  chart5 = new Chart(chart5Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (6 * Math.PI) / (numPoints - 1)),
      datasets: [{
        data: chart5data,
        borderWidth: 2,
        borderColor: chartColors[4],
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
            text: titles[4]
          }
        }
      }
    }
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
    options: {
      ...options,
      scales: {
        ...options.scales,
        y: {
          ...options.scales.y,
          title: {
            display: true,
            text: titles[5]
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
  const chartCanvas3 = document.getElementById('chart3');
  const chartCanvas4 = document.getElementById('chart4');
  const chartCanvas5 = document.getElementById('chart5');
  const chartCanvas6 = document.getElementById('chart6');
  numPoints = chartCanvas1.width;

  let chartCanvas = [chartCanvas1, chartCanvas2, chartCanvas3, chartCanvas4, chartCanvas5,chartCanvas6];
  let titles = ["Vs", "Vref", "Ig1", "Ig2", "Ise1", "Ise2"];
  generateChartData(0);
  updateChart(chartCanvas, titles);
  slider.addEventListener('input', () => {
    sliderVal = parseInt(slider.value);
    sliderValue.innerText = 180 - parseInt(sliderVal * 0.01 * 180);

    generateChartData(sliderVal);
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    chart4.destroy();
    chart5.destroy();
    chart6.destroy();

    updateChart(chartCanvas, titles);
  });
});
