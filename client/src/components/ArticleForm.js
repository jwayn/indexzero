import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'highlight.js/styles/github.css';
import { Editor } from '@toast-ui/react-editor'

export default class ArticleForm extends Component {
    constructor(props) {
        super();
        this.editorRef = React.createRef();
    }

    submitArticle = () => {
        console.log(this.editorRef.current.getInstance());
        console.log('Hello!');
    }

    cancelArticle = () => {
        //console.log(this.editor.current.getInstance.data);
    }

    render() {
        return (
          <div className="page-container">
            <div className="page-title">
                <div className="page-title__header">
                    <h1>
                        Create an Article
                    </h1>
                    <button className="button" onClick={this.cancelArticle}>Cancel</button>
                </div>
            </div>
            <div className="form-container">
                <div className="form-container__group">
                    <label className="input__label">Title</label>
                    <input className="input__text-box" placeholder="Provide a summary of your article."></input>
                </div>
                <div className="form-container__group editor">
                    <label className="input__label">Body</label>
                    <Editor
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    usageStatistics="false"
                    className="editor"
                    />
                </div>
                <div className="form-container__group">
                    <label className="input__label">Tags</label>
                    <input className="input__text-box"></input>
                </div>
                <button className="button" onClick={this.submitArticle}>Submit</button>
            </div>
          </div>
        );
      }
}