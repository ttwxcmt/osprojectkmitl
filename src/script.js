class Calculator {

    constructor(historyOperandTextElement, outputOperandTextElement) {
        this.historyOperandTextElement = historyOperandTextElement
        this.outputOperandTextElement = outputOperandTextElement
        this.clear()
    }

    clear() {
        this.outputOperand = ''
        this.historyOperand = ''
        this.operation = undefined
    }

    delete() {
        this.outputOperand = this.outputOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.outputOperand.includes('.')) return
        this.outputOperand = this.outputOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.outputOperand === '')
            return
        if (this.historyOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.historyOperand = this.outputOperand
        this.outputOperand = ''
    }

    compute() {
        let computation
        const his = parseFloat(this.historyOperand)
        const output = parseFloat(this.outputOperand)
        if (isNaN(his) || isNaN(output)) return
        switch (this.operation) {
            case '+':
                computation = his + output
                break
            case '-':
                computation = his - output
                break
            case '*':
                computation = his * output
                break
            case '÷':
                computation = his / output
                break
            case '%':
                computation = his * output / 100
                break
            case 'sin':
                computation = Math.sin(output)
                break
            case 'cos':
                computation = Math.cos(output)
                break
            case 'tan':
                computation = Math.tan(output)
                break
            case 'sqrt':
                computation = Math.sqrt(output)
                break
            case '^n':
                computation = Math.pow(his, output)
                break
            default:
                return
        }
        this.outputOperand = computation
        this.operation = undefined
        this.historyOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.outputOperandTextElement.innerText =
            this.getDisplayNumber(this.outputOperand)
        if (this.operation != null) {
            this.historyOperandTextElement.innerText =
                `${this.getDisplayNumber(this.historyOperand)} ${this.operation}`
        } else {
            this.historyOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const historyOperandTextElement = document.querySelector('[data-history-operand]')
const outputOperandTextElement = document.querySelector('[data-output-operand]')

const calculator = new Calculator(historyOperandTextElement, outputOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})