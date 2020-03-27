import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div id="content">
            <QuoteBox />
        </div>
    );
  }
}

class QuoteBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced. ",
            author: "Mrs. Catra Júnior"
        }
        this.NewQuote = this.NewQuote.bind(this)
    }
    NewQuote() {

    }
    render() {
        return (
            <div id="quote-box">
                <p id="text">{this.state.quote}</p>
                <p id="author">{this.state.author}</p>
                <div id="bottom">
                    <div id="quote">
                        <button id="new-quote" onClick={this.NewQuote}/>
                    </div>
                </div>
                <a id="tweet-quote"/>
            </div>
        )
    }
}

export default App;
