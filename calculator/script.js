function addToDisplay(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  try {
      const expression = document.getElementById('display').value;
      const result = eval(expression);
      document.getElementById('display').value = result;

      // Store both the input expression and the output in local storage
      if (localStorage.getItem('calculations') === null) {
          localStorage.setItem('calculations', JSON.stringify([{ input: expression, output: result }]));
      } else {
          const calculations = JSON.parse(localStorage.getItem('calculations'));
          calculations.push({ input: expression, output: result });
          localStorage.setItem('calculations', JSON.stringify(calculations));
      }
  } catch (error) {
      document.getElementById('display').value = 'Error';
  }
}

function showHistory() {
  const historyDisplay = document.getElementById('historyDisplay');
  const calculationHistory = document.getElementById('calculationHistory');
  const calculations = JSON.parse(localStorage.getItem('calculations'));

  if (calculations && calculations.length > 0) {
      calculationHistory.innerHTML = '';
      calculations.forEach(calculation => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${calculation.input}</strong> = ${calculation.output}`;
          calculationHistory.appendChild(li);
      });
      historyDisplay.style.display = 'block';
  } else {
      historyDisplay.style.display = 'none';
  }
}
