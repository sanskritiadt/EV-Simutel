let chart1, chart2, chart3, chart4, chart5;
let chart1data = [], chart2data = [], chart3data = [], chart4data = [], chart5data = [];
let sliderVal;
let numPoints;
let piCycle = 6; // Default value, you can change this as needed

function generateChartData(sliderVal) {
  chart1data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    return Math.sin(xValue);
  });

  chart2data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const positionInCycle = xValue % Math.PI;
    const sliderPercentage = sliderVal / 100;
    const oddCycleRange = Math.PI * sliderPercentage;

    return positionInCycle <= oddCycleRange ? 0 : Math.abs(Math.sin(xValue));
  });

  chart3data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const positionInCycle = xValue % Math.PI;
    const sliderPercentage = sliderVal / 100;
    const oddCycleRange = Math.PI * sliderPercentage;

    return positionInCycle <= oddCycleRange ? 0 : Math.abs(Math.sin(xValue));
  });

  chart4data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const positionInCycle = xValue % (2 * Math.PI);

    if ((positionInCycle >= 0 && positionInCycle < Math.PI) ||
        (positionInCycle >= 2 * Math.PI && positionInCycle < 3 * Math.PI) ||
        (positionInCycle >= 4 * Math.PI && positionInCycle < 5 * Math.PI)) {
      return -Math.sin(xValue);
    } else {
      return 0;
    }
  });

  chart5data = Array.from({ length: numPoints }, (_, i) => {
    const xValue = i * (piCycle * Math.PI) / (numPoints - 1);
    const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;
    const positionInCycle = xValue % Math.PI;

    if (isOddCycle && positionInCycle / Math.PI < Math.max(0, sliderVal * 0.01)) {
      return Math.sin(xValue);
    } else if (!isOddCycle) {
      return Math.sin(xValue);
    } else {
      return 0;
    }
  });
}

function createChart(ctx, data, color, title, yMin = -0.01, yMax = 1.00001) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (piCycle * Math.PI) / (numPoints - 1)),
      datasets: [
        {
          data,
          borderWidth: 2,
          borderColor: color,
          fill: false
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      animation: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: 0,
          max: piCycle * Math.PI,
          ticks: {
            stepSize: Math.PI,
            callback: (value, index) => `${index}π`
          }
        },
        y: {
          display: true,
          type: 'linear',
          position: 'left',
          min: yMin,
          max: yMax,
          title: { display: true, text: title }
        }
      },
      maintainAspectRatio: false,
      elements: {
        point: { radius: 0 },
        line: { tension: 0.5 }
      }
    }
  });
}

function updateCharts() {
  const colors = ['rgba(153, 102, 255, 1)', 'rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 153, 0, 1)'];
  const titles = ["Vs", "Vo", "Io", "Vd1", "Vd2"];
  const chartData = [chart1data, chart2data, chart3data, chart4data, chart5data];
  const yRanges = [[-1, 1], [-0.01, 1.00001], [-0.01, 1.00001], [-1, 1], [-1, 1]];

  [chart1, chart2, chart3, chart4, chart5].forEach((chart, i) => {
    if (chart) chart.destroy();
    const ctx = document.getElementById(`chart${i + 1}`).getContext('2d');
    window[`chart${i + 1}`] = createChart(ctx, chartData[i], colors[i], titles[i], yRanges[i][0], yRanges[i][1]);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  numPoints = document.getElementById('chart1').width;

  generateChartData(0);
  updateCharts();
});