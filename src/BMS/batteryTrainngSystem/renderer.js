const { webFrame, ipcRenderer } = require('electron');


ipcRenderer.invoke('get-screen-info').then(({ width, height }) => {
  webFrame.setZoomFactor(width / 1366);
});

let voltageData = [];
let timeData = [];
let voltageChart;
let currentVoltage = 0;

function drawLines() {
  var smpsPositionXL = document.getElementById('smpsLabel').getBoundingClientRect().left + window.scrollX;
  var smpsPositionY = document.getElementById('smpsLabel').getBoundingClientRect().top + window.scrollY;
  var smpsPositionXR = document.getElementById('smpsLabel').getBoundingClientRect().right + window.scrollX;

  var paramPositionX = document.getElementById('parametersLabel').getBoundingClientRect().left + window.scrollX;
  var paramPositionXL = document.getElementById('parametersLabel').getBoundingClientRect().left + window.scrollX + 50;
  var paramPositionXR = document.getElementById('parametersLabel').getBoundingClientRect().right + window.scrollX - 50;
  var paramPositionYT = document.getElementById('parametersLabel').getBoundingClientRect().top + window.scrollY + 20;
  var paramPositionYB = document.getElementById('parametersLabel').getBoundingClientRect().bottom + window.scrollY - 20;

  var batteryPositionXL = document.getElementById('batteryLabel').getBoundingClientRect().left + window.scrollX + 50;
  var batteryPositionXR = document.getElementById('batteryLabel').getBoundingClientRect().right + window.scrollX - 50;
  var batteryPositionY = document.getElementById('batteryLabel').getBoundingClientRect().bottom + window.scrollY;

  
  const loadPositionX = document.getElementById('load-section').getBoundingClientRect().left + window.scrollX + 50;
  const loadPositionYT = document.getElementById('load-section').getBoundingClientRect().bottom + window.scrollY - 80;
  const loadPositionYB = document.getElementById('load-section').getBoundingClientRect().bottom + window.scrollY - 15;


  document.getElementById('neutralCircle').setAttribute('cx', smpsPositionXL);
  document.getElementById('neutralCircle').setAttribute('cy', smpsPositionY - 160);

  document.getElementById('liveCircle').setAttribute('cx', smpsPositionXR);
  document.getElementById('liveCircle').setAttribute('cy', smpsPositionY - 160);

  document.getElementById('mainLine1').setAttribute('x1', smpsPositionXL);
  document.getElementById('mainLine1').setAttribute('y1', smpsPositionY);
  document.getElementById('mainLine1').setAttribute('x2', smpsPositionXL);
  document.getElementById('mainLine1').setAttribute('y2', smpsPositionY - 153.5);

  document.getElementById('mainLine2').setAttribute('x1', smpsPositionXR);
  document.getElementById('mainLine2').setAttribute('y1', smpsPositionY);
  document.getElementById('mainLine2').setAttribute('x2', smpsPositionXR);
  document.getElementById('mainLine2').setAttribute('y2', smpsPositionY - 153.5);
  

  document.getElementById('smpsLine1').setAttribute('x1', smpsPositionXL);
  document.getElementById('smpsLine1').setAttribute('y1', smpsPositionY);
  document.getElementById('smpsLine1').setAttribute('x2', smpsPositionXL);
  document.getElementById('smpsLine1').setAttribute('y2', paramPositionYB);

  document.getElementById('smpsLine2').setAttribute('x1', smpsPositionXR);
  document.getElementById('smpsLine2').setAttribute('y1', smpsPositionY);
  document.getElementById('smpsLine2').setAttribute('x2', smpsPositionXR);
  document.getElementById('smpsLine2').setAttribute('y2', paramPositionYT);

  document.getElementById('smpsLine3').setAttribute('x1', smpsPositionXL);
  document.getElementById('smpsLine3').setAttribute('y1', paramPositionYB);
  document.getElementById('smpsLine3').setAttribute('x2', paramPositionX);
  document.getElementById('smpsLine3').setAttribute('y2', paramPositionYB);

  document.getElementById('smpsLine4').setAttribute('x1', smpsPositionXR);
  document.getElementById('smpsLine4').setAttribute('y1', paramPositionYT);
  document.getElementById('smpsLine4').setAttribute('x2', paramPositionX);
  document.getElementById('smpsLine4').setAttribute('y2', paramPositionYT);

  document.getElementById('batteryLine1').setAttribute('x1', paramPositionXL);
  document.getElementById('batteryLine1').setAttribute('y1', paramPositionYT);
  document.getElementById('batteryLine1').setAttribute('x2', batteryPositionXL);
  document.getElementById('batteryLine1').setAttribute('y2', batteryPositionY);

  document.getElementById('batteryLine2').setAttribute('x1', paramPositionXR);
  document.getElementById('batteryLine2').setAttribute('y1', paramPositionYT);
  document.getElementById('batteryLine2').setAttribute('x2', batteryPositionXR);
  document.getElementById('batteryLine2').setAttribute('y2', batteryPositionY);

  document.getElementById('loadLine1').setAttribute('x1', paramPositionXR);
  document.getElementById('loadLine1').setAttribute('y1', loadPositionYT);
  document.getElementById('loadLine1').setAttribute('x2', loadPositionX);
  document.getElementById('loadLine1').setAttribute('y2', loadPositionYT);

  document.getElementById('loadLine2').setAttribute('x1', paramPositionXR);
  document.getElementById('loadLine2').setAttribute('y1', loadPositionYB);
  document.getElementById('loadLine2').setAttribute('x2', loadPositionX);
  document.getElementById('loadLine2').setAttribute('y2', loadPositionYB);

  document.getElementById('main-smpsN').setAttribute('x', smpsPositionXL - 5);
  document.getElementById('main-smpsN').setAttribute('y', smpsPositionY - 175);

  document.getElementById('main-smpsL').setAttribute('x', smpsPositionXR - 5);
  document.getElementById('main-smpsL').setAttribute('y', smpsPositionY - 175);

  document.getElementById('smps-paramText').setAttribute('x', paramPositionX - 200);
  document.getElementById('smps-paramText').setAttribute('y', (paramPositionYT + paramPositionYB + 10) / 2);

  document.getElementById('battery-paramText').setAttribute('x', ((paramPositionXL + paramPositionXR) / 2) - (document.getElementById('battery-paramText').getBBox().width/2));
  document.getElementById('battery-paramText').setAttribute('y', paramPositionYT - 30);
  
  document.getElementById('load-paramText').setAttribute('x', paramPositionXR + 70);
  document.getElementById('load-paramText').setAttribute('y', (paramPositionYT + paramPositionYB + 10) / 2);

  document.getElementById('smps-paramPos').setAttribute('x', paramPositionX - 15);
  document.getElementById('smps-paramPos').setAttribute('y', paramPositionYT - 10);
  document.getElementById('smps-paramNeg').setAttribute('x', paramPositionX - 15);
  document.getElementById('smps-paramNeg').setAttribute('y', paramPositionYB + 15);

  document.getElementById('battery-paramPos').setAttribute('x', paramPositionXL - 15);
  document.getElementById('battery-paramPos').setAttribute('y', paramPositionYT - 25);
  document.getElementById('battery-paramNeg').setAttribute('x', paramPositionXR + 10);
  document.getElementById('battery-paramNeg').setAttribute('y', paramPositionYT - 25);

  document.getElementById('load-paramPos').setAttribute('x', paramPositionXR + 55);
  document.getElementById('load-paramPos').setAttribute('y', paramPositionYT - 10);
  document.getElementById('load-paramNeg').setAttribute('x', paramPositionXR + 57);
  document.getElementById('load-paramNeg').setAttribute('y', paramPositionYB + 15);
}


document.addEventListener('DOMContentLoaded', () => {
  const powerButton = document.getElementById('powerButton');
  const progressBar = document.getElementById('progressBar');
  const lightButtons = document.querySelectorAll('.lightButton');

  let isPowerOn = false;
  let intervalId;
  let batteryLevel = 0;

  const batteryDischargeRate = 0.5;
  const batteryChargeRate = 10;
  const maxBatteryLevel = 100;
  const voltageCoefficient = 12.2 / maxBatteryLevel;

  const ammeter = new JustGage({
    id: 'ammeter',
    value: 0,
    min: 0,
    max: 100,
    title: 'Current',
    label: 'A',
    labelFontColor: '#000',
    gaugeColor: '#303030',
    decimals: true,
    pointer: true
  });

  const voltmeter = new JustGage({
    id: 'voltmeter',
    value: 0,
    min: 0,
    max: 20,
    title: 'Voltage',
    label: 'V',
    labelFontColor: '#000',
    gaugeColor: '#303030',
    decimals: true,
    pointer: true,
    
  });

  const ctx = document.getElementById('voltageChart').getContext('2d');
  voltageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeData,
      datasets: [{
        label: 'Voltage',
        data: voltageData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            duration: 20000, 
            refresh: 1000, 
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      maintainAspectRatio: false
    }
  });


  function updateAmmeter() {
    const voltage = batteryLevel * voltageCoefficient;
    const lightsOn = document.querySelectorAll('.lightButton.active').length;
    
    const totalPower = lightsOn * 21;
    const current = voltage > 0 ? totalPower / voltage : 0;
    
    ammeter.refresh(current);
  }

  
  
  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    timeData.push(now);
    voltageData.push(currentVoltage);
    voltageChart.update();
  }, 500);

  function updateVoltmeter() {
    currentVoltage = batteryLevel * voltageCoefficient;
    voltmeter.refresh(currentVoltage);
    updateAmmeter();
  }

  function updateStats() {
    const voltage = batteryLevel * voltageCoefficient;
    const lightsOn = document.querySelectorAll('.lightButton.active').length;
    const totalPower = lightsOn * 21;
    const current = voltage > 0 ? totalPower / voltage : 0;
    
    const soc = batteryLevel;
    const dod = 100 - soc;
  
    document.getElementById('voltageStat').textContent = `Voltage: ${voltage.toFixed(2)}V`;
    document.getElementById('currentStat').textContent = `Current: ${current.toFixed(2)}A`;
    document.getElementById('socStat').textContent = `SOC: ${soc.toFixed(2)}%`;
    document.getElementById('dodStat').textContent = `DOD: ${dod.toFixed(2)}%`;
  }
  
  function updateBatteryLevel(delta) {
    batteryLevel += delta;
    batteryLevel = Math.max(0, Math.min(maxBatteryLevel, batteryLevel));
    progressBar.style.width = `${batteryLevel}%`;
    updateVoltmeter();
    updateStats();
  }

  powerButton.addEventListener('click', () => {
    isPowerOn = !isPowerOn;
    powerButton.style.backgroundColor = isPowerOn ? 'red' : 'white';
    powerButton.style.color = isPowerOn ? 'white' : 'red';
    document.getElementById("batteryStat").textContent = isPowerOn ? 'Battery Status: Charging' : 'Battery Status: Idle';
    document.getElementById("batteryStat").style.color = isPowerOn ? 'green' : 'orange';
    managePowerState();
  });

  function managePowerState() {
    clearInterval(intervalId);

    if (isPowerOn) {
      intervalId = setInterval(() => {
        updateBatteryLevel(batteryChargeRate / 10);
        if (batteryLevel >= maxBatteryLevel) {
          batteryLevel = maxBatteryLevel;
          clearInterval(intervalId);
          alert('Battery charged to 100%');
        }
      }, 100);
    } else {
      updateVoltmeter();
    }
    updateStats();
  }


  function manageLightState() {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        const lightsOn = document.querySelectorAll('.lightButton.active').length;
        if (lightsOn > 0) {
            updateBatteryLevel(-batteryDischargeRate * lightsOn / 10);
            document.getElementById("batteryStat").textContent = 'Battery Status: Discharging';
            document.getElementById("batteryStat").style.color = 'red';
        } else if (isPowerOn) {
            updateBatteryLevel(batteryChargeRate / 10);
        } else{
          document.getElementById("batteryStat").textContent = 'Battery Status: Idle';
          document.getElementById("batteryStat").style.color = 'orange';
        } 
        if (batteryLevel <= 0) {
            batteryLevel = 0;
            clearInterval(intervalId);
            alert('Battery empty');
            lightButtons.forEach(button => button.classList.remove('active'));
        }
    }, 100);

    updateAmmeter();
    updateStats();
  }

  lightButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log("Light Clicked");
        const isLightOn = button.classList.toggle('active');

        const lightImg = document.getElementById(`lightImg${index + 1}`);

        if (lightImg) {
            lightImg.src = isLightOn ? 'img/lighton.png' : 'img/lightoff.png';
        }

        manageLightState();
    });
  });

  progressBar.style.width = '0%';
  updateVoltmeter();
  updateStats();
  drawLines();
});



window.addEventListener('resize', drawLines);