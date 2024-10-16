// Function to calculate Vs based on the provided formula
function calculateValues() {
  // Get input values and parse them as numbers
  const Em = parseFloat(document.getElementById('EmInput').value);
  const alphaDegrees = parseFloat(document.getElementById('alphaInput').value);

  if (alphaDegrees < 0 || alphaDegrees > 180 || isNaN(alphaDegrees)) {
    // Display error message
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p style="color: red;"><b>Error: Alpha value must be between 0 and 180 degrees</b></p>';
    return; // Exit the function early
  }

  const alphaRadians = alphaDegrees * (Math.PI / 180);


  // Calculate Vs based on the provided formula 
  const Edc = ( Em * (1+ Math.cos(alphaRadians))) /(2 * Math.PI);

  // Display the calculated value of Vs

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <p><b>Edc: ${Edc.toFixed(4)}</b></p>
    `;
  
}

// Function to reset input values and output
function resetValues() {
  // Reset input values
  document.getElementById('EmInput').value = '';
  document.getElementById('alphaInput').value = '';

  // Disable previous output
  document.getElementById("output").innerHTML = '';

  // Disable all input fields
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => input.disabled = false);
}