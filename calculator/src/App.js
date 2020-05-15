import React from 'react';
import './App.css';

const op = (w) => (f) => (e1, e2) => w(f(e1, e2))
const sum = (e1, e2) => e1 + e2
const dif = (e1, e2) => e1 - e2
const mul = (e1, e2) => e1 * e2
const div = (e1, e2) => e1 / e2

const buttons = [
    ["AC", "clear"],
    ["÷", "divide"],
    ["X", "multiply"],
    ["7", "seven"],
    ["8", "eight"],
    ["9", "nine"],
    ["-", "subtract"],
    ["4", "four"],
    ["5", "five"],
    ["6", "six"],
    ["+", "add"],
    ["1", "one"],
    ["2", "two"],
    ["3", "three"],
    ["=", "equals"],
    ["0", "zero"],
    [".", "decimal"]
]

const createButton = (display, id, onclickFn) => {
    return (
        <div id={id} className="calcButton" onClick={onclickFn(display)}>
            <span>{display}</span>
        </div>
    )
}

const createdButtons = (onclickFn) => buttons.flatMap((v) => createButton(v[0], v[1], onclickFn))

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            result: 0,
            operator: (i, j) => this.changeResult((_) => i + j),
            firstTerm: "",
            isDecimal: false,
            finished: false
        }

        this.changeIsDecimal = this.changeIsDecimal.bind(this)
        this.changeText = this.changeText.bind(this)
        this.changeFirstTerm = this.changeFirstTerm.bind(this)
    }

    changeText(callback) {
        const newText = callback(this.state.text)
        this.setState({
            text: newText
        })
    }

    changeFinished(callback) {
        const newFinished = callback(this.state.finished)
        this.setState({
            finished: newFinished
        })
    }

    changeOperator(callback) {
        const newFn = callback(this.state.operator)
        this.setState({
            operator: newFn
        })
    }

    changeResult(callback) {
        const newR = callback(this.state.result)
        this.setState({
            result: newR
        })
    }

    changeIsDecimal(callback) {
        const newDec = callback(this.state.isDecimal)
        this.setState({
            isDecimal: newDec
        })
    }

    changeFirstTerm(callback) {
        const newT = callback(this.state.firstTerm)
        if(newT.toString().split("").filter(s => s === ".").length > 1) return null
        this.setState({
            firstTerm: newT
        })
    }

    handle() {
        return (item) => () => {
            const changingResult = op((v) => this.changeResult((_) => v))

            const appendTo = (f, i) => f((current) => current + i)
            const addToText = (i) => appendTo(this.changeText, i)
            const addToTerm = (i) => { if(this.state.firstTerm === "") withMagnitude("+"); appendTo(this.changeFirstTerm, "" + i)}
            const withMagnitude = (mg) => this.state.firstTerm === "" ? appendTo(this.changeFirstTerm, mg) : this.changeFirstTerm((t) => mg + t.substring(1))

            const clearDisplay = () => this.changeText(() => "")
            const clearResultIf = (b) => b ? this.changeResult(() => 0) : null
            const clearTerm = () => this.changeFirstTerm((_) => "")
            const resetOperator = () => (this.changeOperator((_) => (i, j) => this.changeResult((_) => i + j)))

            const isFinished = (b) => this.changeFinished((_) => b)
            const isDecimal = (b) => this.changeIsDecimal((_) => b)

            const feedEvenOnFirstOp = () => this.state.operator(parseFloat(this.state.result), parseFloat(this.state.firstTerm === "" ? 0 : this.state.firstTerm))

            const evaluate = () => {feedEvenOnFirstOp(); clearTerm()}
            const operation = (i, f) => {
                addToText(i)
                evaluate()
                this.changeOperator((_) => changingResult(f))
            }
            const magnitude = (mg) => {withMagnitude(mg); addToText(mg)}
            const checkIfMagnitudeOrOperation = (i, f) => isNaN(parseFloat(this.state.firstTerm)) ? magnitude(i) : operation(i, f)

            switch (item) {
                case "AC": clearDisplay(); resetOperator(); clearTerm(); clearResultIf(true); isDecimal(false); break;
                case "+": isFinished(false); checkIfMagnitudeOrOperation(item, sum); break;
                case "-": isFinished(false); checkIfMagnitudeOrOperation(item, dif); break;
                case "X": isFinished(false); operation("x", mul); break;
                case "÷": isFinished(false); operation(item, div); break;
                case "=": evaluate(); clearDisplay(); isFinished(true); resetOperator(); isDecimal(false); break;
                case ".": addToText(item); addToTerm(item); clearResultIf(this.state.finished); isFinished(false); isDecimal(true); break;
                default: addToText(item); addToTerm(item); clearResultIf(this.state.finished); isFinished(false);
            }
        }
    }

    assureFloat(v) {
        return this.state.isDecimal && Number.isInteger(v) ? v.toFixed(1) : v
    }

    render() {
        return (
            <div id="app">
                <div id="top">
                    <span id="raw">{this.state.text}</span>
                    <span id="display">{this.state.finished || isNaN(parseFloat(this.state.firstTerm)) ? this.assureFloat(this.state.result) : this.assureFloat(parseFloat(this.state.firstTerm))}</span>
                </div>
                {createdButtons(this.handle())}
            </div>
        )
    }
}

export default App;
