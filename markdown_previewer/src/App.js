import React, {Fragment} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import marked from 'marked'
import DOMPurify from 'dompurify';

const Preview = (props) => {
    const sanitizedHtml = {__html: DOMPurify.sanitize(marked(props.text))};
    return (
        <div id="preview" dangerouslySetInnerHTML={sanitizedHtml}/>
    );
}

Preview.propTypes = {
    text: PropTypes.string.isRequired
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "jjj"
        }
        this.updateText = this.updateText.bind(this)
    }

    updateText(event) {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <textarea id="editor" onChange={this.updateText} value={this.state.text}/>
                <Preview text={this.state.text}/>
            </Fragment>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <Editor />
        );
    }
}

export default App;
