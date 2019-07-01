import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import './Editor.css';

const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
  });

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: ''
        }
    }

    renderPreview() {
        return {__html: this.state.markdownPreview}
    }

    onEditorChange = event => {
        this.setState({markdownPreview: md.render(event.target.value)})
    }

    render() {
        return (
            <div className="editor__container">
                <div className="editor__controls">

                </div>
                <textarea className="editor__textarea" onChange={this.onEditorChange}/>
                <hr className="editor__separator" />
                <h1>{this.props.summary}</h1>
                <div className="editor__preview" dangerouslySetInnerHTML={this.renderPreview()}>
                </div>
            </div>
        )
    }
}