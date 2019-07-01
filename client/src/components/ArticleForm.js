import React, { Component } from 'react';
import Editor from './Editor';
import TagEditor from './TagEditor';

export default class ArticleForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            summary: ''
        }
    }

    submitArticle = () => {
        console.log('Hello!');
    }

    cancelArticle = () => {
        this.props.history.push(`/`);
    }

    onSummaryChange = event => {
        this.setState({summary: event.target.value});
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
                    <input className="input__text-box" onChange={this.onSummaryChange} placeholder="Provide a summary of your article."></input>
                </div>
                <div className="form-container__group editor">
                    <label className="input__label">Body</label>
                    <Editor summary={this.state.summary} />
                </div>
                <TagEditor />
                <button className="button" onClick={this.submitArticle}>Submit</button>
            </div>
          </div>
        );
      }
}