import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

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


export default class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markdownPreview: ''
        }
    }

    renderPreview() {
        return {__html: this.state.markdownPreview}
    }

    componentDidMount() {
        this.setState({markdownPreview: md.render(this.props.initialValue)});
    }

    render() {
        return (
            <div>
                <div className="editor__preview" dangerouslySetInnerHTML={this.renderPreview()}>
                </div>
            </div>
        )
    }
}