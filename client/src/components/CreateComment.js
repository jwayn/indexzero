import React, { Component } from 'react';
import Editor from './Editor';
import AuthContext from '../context/auth-context';

export default class ArticleForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        
        this.state = {
            body: ''
        }
    }

    submitComment = async () => {
        console.log('This thing on?');
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.context.token
        }
        
        const body = {
            content: this.state.body
        }

        const options = {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
        };

        const returnedComment = await fetch(`/api/comments/parentpost=${this.props.postId}`, options);
        if(returnedComment.status === 200) {
            const commentJson = await returnedComment.json();
            this.props.addComment(commentJson);
        } else {
            console.log('Fuck');
            // Signal to the user that the comment could not be posted
        }

        

    }

    bodyChange = rawText => {
        this.setState({body: rawText});
    }

    render() {
        return (
            <div className="comment-create-container">
                <h2>Create a Comment</h2>
                <div className="form-container">
                    <div className="form-container__group editor">
                        <label className="input__label">Add a comment</label>
                        <Editor bodyChange={this.bodyChange} />
                    </div>
                    <button className="button" onClick={this.submitComment}>Submit</button>
                </div>
            </div>
        );
      }
}