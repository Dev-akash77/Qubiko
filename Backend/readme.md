```html
<!DOCTYPE html>
<html>
  <head>
    <title>Calculator</title>
    <style>
      body {
        font-family: sans-serif;
      }
      .calculator {
        width: 300px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
      }
      .display {
        background-color: #eee;
        padding: 10px;
        margin-bottom: 10px;
        text-align: right;
        font-size: 20px;
      }
      .buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 5px;
      }
      button {
        padding: 10px;
        font-size: 18px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: #eee;
      }
    </style>
  </head>
  <body>
    <div class="calculator">
      <div class="display" id="display">0</div>
      <div class="buttons">
        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button onclick="appendOperator('/')">/</button>
        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button onclick="appendOperator('*')">*</button>
        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button onclick="appendOperator('-')">-</button>
        <button onclick="appendNumber('0')">0</button>
        <button onclick="appendDecimal('.')">.</button>
        <button onclick="calculate()">=</button>
        <button onclick="appendOperator('+')">+</button>
        <button onclick="clearDisplay()">C</button>
      </div>
    </div>

    <script>
      let display = document.getElementById("display");
      let currentInput = "";

      function appendNumber(number) {
        currentInput += number;
        display.textContent = currentInput;
      }

      function appendOperator(operator) {
        currentInput += operator;
        display.textContent = currentInput;
      }

      function appendDecimal(decimal) {
        if (!currentInput.includes(decimal)) {
          currentInput += decimal;
          display.textContent = currentInput;
        }
      }

      function calculate() {
        try {
          let result = eval(currentInput);
          display.textContent = result;
          currentInput = result.toString();
        } catch (error) {
          display.textContent = "Error";
          currentInput = "";
        }
      }

      function clearDisplay() {
        currentInput = "";
        display.textContent = "0";
      }
    </script>
  </body>
</html>
```
