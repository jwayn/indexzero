import React, { Component } from 'react';
import Editor from './Editor';
import TagEditor from './TagEditor';
import AuthContext from '../context/auth-context';

export default class ArticleForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        
        this.state = {
            summary: '',
            body: '',
            tags: []
        }
    }

    submitArticle = async () => {
        if(this.context.verified === true) {
            const headers = {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.context.token
            }
            
            const body = {
                post: {
                    summary: this.state.summary,
                    content: this.state.body,
                    identity: 'article'
                }, 
                tags: this.state.tags.map(tag => tag.name)
            }
    
            const options = {
                headers,
                method: 'POST',
                body: JSON.stringify(body)
            };
    
            const returnedPost = await fetch('/api/posts/', options);
            const jsonPost = await returnedPost.json();
            if(returnedPost.status === 200) {
                window.location.assign(`/posts/${jsonPost.id}`);
            } else {
                this.context.notify('Your post could not be submitted at this time.');
            }
        } else {
            this.context.notify('verify');
        }
    }

    addTag = (event) => {
        const tag = event.target.value;
        if(tag.charAt(tag.length - 1) === ' ' && tag.charAt(0) !== ' ') {
            this.setState(prevState => ({
                tags: [...prevState.tags, {name: tag.trim(), key: this.state.tags.length}]
            }));
            event.target.value = '';
        }
    }

    removeTag = index => {
        let tags = [...this.state.tags];
        let tagToDelete = tags.find(tag => tag.key === index);
        tags.splice(tags.indexOf(tagToDelete), 1);
        this.setState({tags})
    }

    cancelArticle = () => {
        this.props.history.push(`/`);
    }

    onSummaryChange = event => {
        this.setState({summary: event.target.value});
    }

    bodyChange = rawText => {
        this.setState({body: rawText});
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
                    <Editor summary={this.state.summary} bodyChange={this.bodyChange} />
                </div>
                <TagEditor tags={this.state.tags} addTag={this.addTag} renderTags={this.addTag} removeTag={this.removeTag} />
                <button className="button" onClick={this.submitArticle}>Submit</button>
            </div>
          </div>
        );
      }
}