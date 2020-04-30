import React from 'react';
import './App.css';

const drumMap: [[string, string, string]] = [
    ["Q", "Heater-1", "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"],
    ["W", "Heater-2", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"],
    ["E", "Heater-3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"],
    ["A", "Heater-4", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"],
    ["S", "Heater-6", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"],
    ["D", "Dsc_Oh", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"],
    ["Z", "Kick_n_Hat", "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"],
    ["X", "Kick", "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"],
    ["C", "Cev_H2", "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"]
]

const genButton = (letter, name, url, onclickFn) => {
    return (
        <div id={name} className="drum-pad" onClick={onclickFn}>
            <span>{letter}</span>
            <audio src={url} className="clip" id={letter}/>
        </div>
        )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "Play!"
        }
        this.main = React.createRef()
        this.play = this.play.bind(this)
    }

    checkKey() {
        return (event) =>  this.play(event.key.toUpperCase(), (node) => node.parentElement.id)
    }

    handleClick(id, name) {
        return () => this.play(id, (_) => name)
    }

    play(id: string, f: function) {
        const node = document.getElementById(id)
        const name = f(node)
        this.setState({
            key: name
        })
        node.currentTime = 0
        node.play()
    }

    componentDidMount() {
        this.main.current.focus()
    }

    render() {
        const buttons = drumMap.flatMap((dm) => genButton(dm[0], dm[1], dm[2], this.handleClick(dm[0], dm[1])))
        return (
            <div id="drum-machine" tabIndex="0" onKeyDown={this.checkKey()} ref={this.main}>
                <div id="display">
                    <span>{this.state.key}</span>
                </div>
                { buttons }
            </div>
        );
    }
}

export default App;
