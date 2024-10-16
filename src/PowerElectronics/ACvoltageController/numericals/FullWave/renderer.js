
function updateAlphaPrime() {
  var alphaDegrees = parseFloat(document.getElementById("alphaInput").value);
  var alphaRadians = alphaDegrees * (Math.PI / 180);
  document.getElementById("alphaDash").value = alphaRadians.toFixed(4);
}

// Function to update α° when α' changes
function updateAlphaDegrees() {
  var alphaRadians = parseFloat(document.getElementById("alphaDash").value);
  var alphaDegrees = alphaRadians * (180 / Math.PI);
  document.getElementById("alphaInput").value = alphaDegrees.toFixed(4);
}

// Event listener for changes in α° input field
document.getElementById("alphaInput").addEventListener("input", updateAlphaPrime);

// Event listener for changes in α' input field
document.getElementById("alphaDash").addEventListener("input", updateAlphaDegrees);

// Function to calculate Vs based on the provided formula
function calculateValues() {
  // Get input values and parse them as numbers
  const Vs = parseFloat(document.getElementById('VsInput').value);
  const alphaDegrees = parseFloat(document.getElementById('alphaInput').value);
  const alphaRadians = alphaDegrees * (Math.PI / 180); // Convert α from degrees to radians
  const alphaPrime = parseFloat(document.getElementById('alphaDash').value);

  if (alphaDegrees < 0 || alphaDegrees > 180 || isNaN(alphaDegrees)) {
    // Display error message
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p style="color: red;"><b>Error: Alpha value must be between 0 and 180 degrees</b></p>';
    return; // Exit the function early
  }

  // Calculate Vs based on the provided formula
  const Vo = Vs * Math.sqrt(1 /(Math.PI) * ( Math.PI - alphaRadians + Math.sin(2 * alphaRadians) / 2));

  // Display the calculated value of Vs
  document.getElementById("output").innerHTML = `<p><b>Calculated Vo: ${Vo.toFixed(4)}</b></p>`;
  
}

// Function to reset input values and output
function resetValues() {
  // Reset input values
  document.getElementById('VsInput').value = '';
  document.getElementById('alphaInput').value = '';
  document.getElementById('alphaDash').value = '';

  // Disable previous output
  document.getElementById("output").innerHTML = '';

  // Disable all input fields
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => input.disabled = false);
}