import React from 'react';
import './App.css';

const dateDiffInSeconds = (a, b) => Math.floor((a - b) / 1000)

const ParamBlock = (props) => {
  return (
    <div id={props.name + "-label"}>
      <span className="label all-line">{props.title}</span>
      <span className="label" id={props.name + "-decrement"} onClick={props.dec}>-</span>
      <span className="label" id={props.name + "-length"}>{props.disp}</span>
      <span className="label" id={props.name + "-increment"} onClick={props.inc}>+</span>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      seconds: 0,
      acc: 0,
      start: null,
      active: false,
      onBreak: false
    }

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reset = this.reset.bind(this)
    this.audio = new Audio("https://goo.gl/65cBl1")
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.start != null) {
        const sec = this.state.acc - dateDiffInSeconds(new Date(), this.state.start)
        if(sec <= 0) this.nextCicle()
        this.setState({
          seconds: sec
        })
      }
    }, 1000)
  }

  nextCicle() {
    this.setState((state) => ({
      onBreak: !this.state.onBreak
    }))
    if(this.state.onBreak) {
      this.play()
      this.start((_) => this.state.break * 60)
    }
    else {
      this.start((_) => this.state.session * 60)
    }
  }

  play() {
    this.audio.currentTime = 0
    this.audio.play()
  }

  break(f) {
    const newBreak = f(this.state.break)
    this.setState({
      break: newBreak
    })
  }

  session(f) {
    const newSession = f(this.state.session)
    this.setState({
      session: newSession
    })
  }

  start(f) {
    const acc = this.state.active ? f(this.state.acc) : this.state.session * 60
    this.setState({
      start: new Date(),
      active: true,
      acc: acc
    })
  }

  stop() {
    const acc = this.state.acc - dateDiffInSeconds(new Date(), this.state.start)
    this.setState({
      start: null,
      acc: acc
    })
  }

  reset() {
    this.setState({
      break: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
      start: null,
      active: false,
      acc: 0
    })
    this.audio.pause()
    this.audio.currentTime = 0
  }

  render() {
    const maxSixty = (n) => n > 60 ? 60 : n
    const minOne = (n) => n < 1 ? 1 : n
    const withRange = (n) => minOne(maxSixty(n))
    const incrementBreak = () => this.break((b) => withRange(b + 1))
    const decrementBreak = () => this.break((b) => withRange(b - 1))
    const incrementSession = () => this.session((s) => withRange(s + 1))
    const decrementSession = () => this.session((s) => withRange(s - 1))
    const formatAsTime = (n) => ((str) => str.length < 2 ? "0" + str : str)(n.toString())

    return (
      <div id="app">
        <div id="top">
          <ParamBlock name="break" title="Break length" inc={incrementBreak} dec={decrementBreak} disp={formatAsTime(this.state.break)}/>
          <ParamBlock name="session" title="Session length" inc={incrementSession} dec={decrementSession} disp={formatAsTime(this.state.session)}/>
        </div>
        <div id="bottom">
          <div id="timer-label">
            <span className="label all-line">{this.state.onBreak ? "Break" : "Session"}</span>
            <span className="label" id="time-left">{this.state.active ? formatAsTime(Math.floor(this.state.seconds / 60)) : formatAsTime(this.state.session)}:{formatAsTime(this.state.seconds % 60)}</span>
          </div>
          <div id="start_stop">
            {this.state.start != null
              ? <i onClick={this.stop} className="label fa fa-pause"/>
              : <i onClick={() => this.start((a) => a)} className="label fa fa-play"/>
            }
            <i onClick={this.reset} className="label fa fa-stop" id="reset"/>
          </div>
        </div>
        <audio id="beep"/>
      </div>
    );
  }
}

export default App;
