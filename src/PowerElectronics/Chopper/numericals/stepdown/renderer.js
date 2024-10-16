const TonInput = document.getElementById('TonInput');
  const ToffInput = document.getElementById('ToffInput');

  TonInput.addEventListener('input', () => {
    const Ton = parseFloat(TonInput.value);
    const Toff = 100 - Ton;
    ToffInput.value = Toff;
  });

  ToffInput.addEventListener('input', () => {
    const Toff = parseFloat(ToffInput.value);
    const Ton = 100 - Toff;
    TonInput.value = Ton;
  });

  const fInput = document.getElementById('fInput');
  const TInput = document.getElementById('TInput');

  fInput.addEventListener('input', () => {
    TInput.disabled = !!fInput.value;
  });

  TInput.addEventListener('input', () => {
    fInput.disabled = !!TInput.value;
  });

  const alphaInput = document.getElementById('alphaInput');

  TonInput.addEventListener('input', () => {
    alphaInput.disabled = !!TonInput.value || !!ToffInput.value;
  });

  ToffInput.addEventListener('input', () => {
    alphaInput.disabled = !!TonInput.value || !!ToffInput.value;
  });

  alphaInput.addEventListener('input', () => {
    if (!TonInput.value && !ToffInput.value) {
      alphaInput.disabled = false;
    }
  });

  function calculateValues() {
    // Get input values and parse them as numbers
    const Edc = parseFloat(document.getElementById('EdcInput').value);
    const alpha = parseFloat(document.getElementById('alphaInput').value);
    const Ton = parseFloat(document.getElementById('TonInput').value);
    const Toff = parseFloat(document.getElementById('ToffInput').value);
    const f = parseFloat(document.getElementById('fInput').value);
    const T = parseFloat(document.getElementById('TInput').value);

  if (Ton < 0 || Ton > 100 || Toff < 0 || Toff > 100) {
    // Display error message
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p style="color: red;"><b>Error: Ton and Toff must be in the range 0 to 100.</b></p>';
    return;
  }

  if (alpha < 0 || alpha > 1) {
    // Display error message
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p style="color: red;"><b>Error: α must be in the range 0 to 1.</b></p>';
    return;
  }

    // Calculate f and α based on provided formulas
    const calculatedF = 1 / T || f;
    const calculatedT = 1 / f || T;
    const calculatedAlpha = Ton / (Ton + Toff) || alpha;

    // Calculate Eo based on Edc and α
    const calculatedEo = Edc * calculatedAlpha;

    // Display the calculated values
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p> Edc: ${Edc.toFixed(2)}</p>
      <p> f: ${calculatedF.toFixed(2)} Hz</p>
      <p> α: ${calculatedAlpha.toFixed(2)}</p>
      <p> T: ${calculatedT.toFixed(2)}</p>
      <p> To: ${Ton.toFixed(2)}</p>
      <p> Toff: ${Toff.toFixed(2)}</p>
      <p> Eo: ${calculatedEo.toFixed(2)}</p>
      `;
  
  }

  function resetValues() {
    document.getElementById('EdcInput').value = '';
    document.getElementById('alphaInput').value = '';
    document.getElementById('TonInput').value = '';
    document.getElementById('fInput').value = '';
    document.getElementById('TInput').value = '';
    document.getElementById('ToffInput').value = '';
    document.getElementById('output').innerHTML = '';

    // Enable all input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.disabled = false);
  }