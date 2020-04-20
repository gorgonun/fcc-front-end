import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import marked from 'marked'
import DOMPurify from 'dompurify';

const exampleText = "# Welcome\n" +
    "---\n" +
    "## This site\n" +
    "This is [a beautiful](https://extra.globo.com/incoming/5891747-b0c-d6c/w448h673-PROP/xcantor.jpg.pagespeed.ic.iyLW8n2M3o.jpg) demonstration of markdown\n" +
    "\n" +
    "```bash\nAleatory text\n```\n" +
    "- Can you do this?\n" +
    "> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n" +
    "> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n" +
    "> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus." +
    "![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)\n" +
    "`Another here`\n" +
    "***I am bold**"

const Preview = (props) => {
    const sanitizedHtml = {__html: DOMPurify.sanitize(marked(props.text))};
    return (
        <div id="preview" className="container" dangerouslySetInnerHTML={sanitizedHtml} style={{width: `${props.size}%`}}/>
    );
}

Preview.propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
}

const Editor = (props) => {
    return (
        <div id="editor-wrapper" className="container" style={{width: `${props.size}%`}}>
            <textarea id="editor" onChange={props.updateText} value={props.text}/>
        </div>
    );
}

Editor.propTypes = {
    text: PropTypes.string.isRequired,
    updateText: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: exampleText,
            editorSize: 50,
            previewSize: 50
        }
        this.updateText = this.updateText.bind(this)
        this.changeSize = this.changeSize.bind(this)
    }

    updateText(event) {
        this.setState({
            text: event.target.value
        })
    }

    changeSize(event) {
        this.setState({
            editorSize: event.target.value,
            previewSize: 100 - event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="controller" >
                    <input type="range" min="0" max="100" defaultValue="50" onChange={this.changeSize}/>
                </div>
                <div id="main">
                    <Editor text={this.state.text} updateText={this.updateText} size={this.state.editorSize}/>
                    <Preview text={this.state.text} size={this.state.previewSize}/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
