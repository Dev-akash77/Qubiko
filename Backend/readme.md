 Here's the code for a simple calculator using HTML, CSS, and JavaScript. This example handles basic arithmetic operations. More advanced features (like handling errors, more operators, memory functions) could be added.

```html
<!DOCTYPE html>
<html>
<head>
<title>Simple Calculator</title>
<style>
body {
  font-family: sans-serif;
}
.calculator {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
}
.display {
  background-color: #eee;
  padding: 10px;
  text-align: right;
  font-size: 20px;
  margin-bottom: 10px;
}
button {
  width: 50px;
  height: 50px;
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
}
```

```javascript
let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.value;
    if (value === "=") {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = "Error";
      }
    } else if (value === "C") {
      display.value = "";
    } else {
      display.value += value;
    }
  });
});
```

```html
<body>
<div class="calculator">
  <input type="text" id="display" readonly>
  <div>
    <button value="7">7</button>
    <button value="8">8</button>
    <button value="9">9</button>
    <button value="/">/</button>
  </div>
  <div>
    <button value="4">4</button>
    <button value="5">5</button>
    <button value="6">6</button>
    <button value="*">*</button>
  </div>
  <div>
    <button value="1">1</button>
    <button value="2">2</button>
    <button value="3">3</button>
    <button value="-">-</button>
  </div>
  <div>
    <button value="0">0</button>
    <button value=".">.</button>
    <button value="=">=</button>
    <button value="+">+</button>
  </div>
  <div>
    <button value="C">C</button>
  </div>
</div>
</body>
</html>
```

Remember to save these three parts (HTML, CSS, and JavaScript) in separate files (e.g., `index.html`, `style.css`, and `script.js`) and link them appropriately. The JavaScript should be included at the end of the `<body>` or in a separate `.js` file linked to your HTML. This provides a basic calculator; error handling and more advanced features could be added to improve it.
