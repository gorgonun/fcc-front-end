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
            quote: "",
            author: "",
            image: ""
        }
        this.NewQuote = this.NewQuote.bind(this);
    }
    NewQuote() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + "https://thesimpsonsquoteapi.glitch.me/quotes")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    quote: result[0].quote,
                    author: result[0].character,
                    image: result[0].image
            })
                document.body.style.backgroundImage = `url(${this.state.image})`;
            });
    }
    componentDidMount() {
        this.NewQuote();
    }

    render() {
        return (
            <div id="quote-box">
                <p id="text">{this.state.quote}</p>
                <p id="author">{this.state.author}</p>
                <div id="bottom">
                    <div id="social-networks">
                        <a id="tweet-quote"></a>
                    </div>
                    <div id="quote">
                        <button id="new-quote" onClick={this.NewQuote}>New quote</button>
                    </div>
                </div>
                <a id="tweet-quote"/>
            </div>
        )
    }
}

export default App;
