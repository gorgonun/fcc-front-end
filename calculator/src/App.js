import React from 'react';
import logo from './logo.svg';
import './App.css';

const buttons = [
    ["AC", "clear"],
    ["/", "divide"],
    ["X", "multiply"],
    ["7", "seven"],
    ["8", "eight"],
    ["9", "nine"],
    ["-", "subtract"],
    ["4", "four"],
    ["5", "five"],
    ["6", "six"],
    ["+", "sum"],
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
            display: "",
            fn: (i) => this.changeResult((_) => i),
            result: 0,
            current: "",
            prepared: false
        }

        this.changeDisplay = this.changeDisplay.bind(this)
        this.changeFn = this.changeFn.bind(this)
        this.changeResult = this.changeResult.bind(this)
        this.changeCurrent = this.changeCurrent.bind(this)
        this.changePrepared = this.changePrepared.bind(this)
    }

    changeDisplay(callback) {
        const newDisp = callback(this.state.display)
        this.setState({
            display: newDisp
        })
    }

    changeFn(callback) {
        const newFn = callback(this.state.fn)
        this.setState({
            fn: newFn
        })
    }

    changeResult(callback) {
        const newR = callback(this. pastate.result)
        console.log(newR)
        this.setState({
            result: newR
        })
    }

    changeCurrent(callback) {
        const newC = callback(this.state.current)
        // console.log(newC)
        this.setState({
            current: newC
        })
    }

    changePrepared(callback) {
        const newP = callback(this.state.prepared)
        this.setState({
            prepared: newP
        })
    }

    handle() {
        return (item) => () => {
            const before = (f1) => (f2) => { f2(); return f1() }
            const feedFn = (food) => this.changeFn((fn) => (fn(food)))
            const substituteResult = (newR) => this.changeResult((_) => newR)
            const appendFn = (i) => (current) => current + i
            const ifPrepared = (fn) => this.state.prepared ? fn() : () => ""
            const feedIfPrepared = (cb) => ifPrepared(() => {feedFn(parseInt(this.state.current)); this.changeCurrent((_) => ""); cb()})
            const setPreparedAs = (isPrepared) => this.changePrepared((_) => isPrepared)
            const addToDisplay = (i) => this.changeDisplay(appendFn(i))
            const addToCurrent = (i) => this.changeCurrent(appendFn(i))
            const clearDisplay = () => this.changeDisplay(() => "");
            const feedAndChange = (newF) => (food) => this.changeFn((fn) => {fn(food); return newF})
            switch (item) {
                case "AC": clearDisplay(); break;
                case "+": addToDisplay(item); feedAndChange(this.sum(substituteResult)(this.state.result))(parseInt(this.state.current)); break;
                case "=": clearDisplay(); feedAndChange(() => this.state.result)(parseInt(this.state.current)); addToDisplay(this.state.result); break;
                default: this.changeCurrent((_) => ""); addToDisplay(parseInt(item)); addToCurrent(parseInt(item));
            }
        }
    }

    sum(wrapper) {
        return (e1) => (e2) => wrapper(e1 + e2)
    }

    render() {
        return (
            <div id="app">
                <div id="display">
                    <span>{this.state.display}</span>
                </div>
                {createdButtons(this.handle())}
            </div>
        )
    }
}

export default App;
