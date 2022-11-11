const numeroBotoes = document.querySelectorAll("[data-number]");
const botoesOperacoes = document.querySelectorAll("[data-operator]");
const botaoIgual = document.querySelector("[data-equals]");
const botaoDeletar = document.querySelector("[data-delete]");
const limparTudo = document.querySelector("[data-all-clear]");
const operadorAnterior = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculadora {
  constructor(operadorAnterior, currentOperandTextElement) {
    this.operadorAnterior = operadorAnterior;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const numerosInteiros = parseFloat(stringNumber.split(".")[0]);
    const numerosDecimais = stringNumber.split(".")[1];

    let inteiroDisplay;

    if (isNaN(numerosInteiros)) {
      inteiroDisplay = "";
    } else {
      inteiroDisplay = numerosInteiros.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (numerosDecimais != null) {
      return `${inteiroDisplay}.${numerosDecimais}`;
    } else {
      return inteiroDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _operadorAnterior = parseFloat(this.previousOperand);
    const _operadorAtual = parseFloat(this.currentOperand);

    if (isNaN(_operadorAnterior) || isNaN(_operadorAtual)) return;

    switch (this.operation) {
      case "+":
        result = _operadorAnterior + _operadorAtual;
        break;
      case "-":
        result = _operadorAnterior - _operadorAtual;
        break;
      case "÷":
        result = _operadorAnterior / _operadorAtual;
        break;
      case "*":
        result = _operadorAnterior * _operadorAtual;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.operadorAnterior.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculadora = new Calculadora(
  operadorAnterior,
  currentOperandTextElement
);

for (const numeroBotao of numeroBotoes) {
  numeroBotao.addEventListener("click", () => {
    calculadora.appendNumber(numeroBotao.innerText);
    calculadora.updateDisplay();
  });
}

for (const botaoOperacao of botoesOperacoes) {
  botaoOperacao.addEventListener("click", () => {
    calculadora.chooseOperation(botaoOperacao.innerText);
    calculadora.updateDisplay();
  });
}

limparTudo.addEventListener("click", () => {
  calculadora.clear();
  calculadora.updateDisplay();
});

botaoIgual.addEventListener("click", () => {
  calculadora.calculate();
  calculadora.updateDisplay();
});

botaoDeletar.addEventListener("click", () => {
  calculadora.delete();
  calculadora.updateDisplay();
});
