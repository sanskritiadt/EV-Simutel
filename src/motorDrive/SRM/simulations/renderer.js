document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  const srmVideo = document.getElementById('srmVideo');

  let lastFrameTime = 0;
  var piCycles = 10;
  var dataPoints = 360 / piCycles;

  function updateVideoPlayback(currentTime) {
    const speed = parseFloat(slider.value);
    const playbackRate = speed / 2;
    sliderValue.textContent = (2400 * speed).toFixed(0) * 0.01;

    const deltaTime = (currentTime - lastFrameTime) / 1000;
    srmVideo.currentTime += deltaTime * playbackRate;
    lastFrameTime = currentTime;

    if (srmVideo.currentTime >= srmVideo.duration) {
      srmVideo.currentTime = 0;
    }

    updateSpeedChart(); // Update the speed chart every frame

    requestAnimationFrame(updateVideoPlayback);
  }

  srmVideo.addEventListener('loadedmetadata', () => {
    srmVideo.loop = true;
    srmVideo.play();
    updateVideoPlayback(performance.now());
  });

  var ctx = document.getElementById('chart1').getContext('2d');

  var data = [];
  var labels = [];
  var datasets = [];
  var chart;

  function generateData() {
    data = [];
    labels = [];

    for (var i = 0; i < piCycles * Math.PI; i += Math.PI / dataPoints) {
      var cycle = Math.floor(i / Math.PI);
      var progress = (i % Math.PI) / Math.PI;
      var value;

      if (cycle % 2 === 0) {
        if (progress < 0.5) {
          value = progress * 2;
        } else {
          value = 2 - progress * 2;
        }
      } else {
        value = 0;
      }

      data.push(value);
      labels.push('');
    }
  }

  function resetChart() {
    if (chart) {
      chart.destroy();
    }

    datasets = [
      {
        data: [],
        borderColor: 'blue',
        fill: false,
        lineTension: 0
      },
      {
        data: [],
        borderColor: 'red',
        fill: false,
        lineTension: 0
      },
      {
        data: [],
        borderColor: 'green',
        fill: false,
        lineTension: 0
      },
      {
        data: [],
        borderColor: 'orange',
        fill: false,
        lineTension: 0
      }
    ];

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        animation: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time"
            }
          },
          y: {
            display: true,
            type: 'linear',
            position: 'left',
            min: 0,
            max: 1,
            title: {
              display: true,
              text: "Flux"
            },
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
            tension: 0
          }
        }
      }
    });
  }

  var currentIndex = 0;
  var animationSpeed = 5; // Adjust this value to control the animation speed

  function animateGraph() {
    currentIndex = 0; // Reset the current index to start from the beginning

    function animationLoop() {
      for (var i = 0; i < animationSpeed; i++) {
        if (currentIndex < data.length) {
          datasets.forEach((dataset, index) => {
            var shiftedIndex = (currentIndex + Math.floor(index * dataPoints / 2)) % data.length;
            dataset.data.push(data[shiftedIndex]);
          });
          currentIndex++;
        } else {
          break;
        }
      }

      chart.update();

      if (currentIndex < data.length) {
        requestAnimationFrame(animationLoop);
      }
    }

    animationLoop();
  }

  var ctx3 = document.getElementById('chart3').getContext('2d');
  var speedData = [];
  var speedLabels = [];
  var speedChart;

  function createSpeedChart() {
    speedChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: speedLabels,
        datasets: [{
          label: 'Speed Value',
          data: speedData,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        animation: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time"
            }
          },
          y: {
            display: true,
            type: 'linear',
            position: 'left',
            min: 0,
            max: 2400,
            title: {
              display: true,
              text: "RPM"
            }
          }
        },
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        }
      }
    });
  }

  function updateSpeedChart() {
    speedData.push(parseFloat(slider.value * 0.01 * 2400));
    speedLabels.push('');

    if (speedData.length > 500) {
      speedData.shift();
      speedLabels.shift();
    }

    speedChart.update();
  }

  createSpeedChart();

  slider.addEventListener('change', () => {
    const speed = parseFloat(slider.value);
    piCycles = (speed * 0.01 * 24).toFixed(0);
    dataPoints = (360 / piCycles).toFixed(0);
    generateData();
    resetChart();
    animateGraph();
  });

  generateData();
  resetChart();
  animateGraph();
});