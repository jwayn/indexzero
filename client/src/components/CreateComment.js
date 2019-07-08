import React, { Component } from 'react';
import Editor from './Editor';
import AuthContext from '../context/auth-context';

export default class ArticleForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.editorRef = React.createRef();
        this.previewRef = React.createRef();
        
        this.state = {
            body: ''
        }
    }

    submitComment = async () => {
        console.log(this.context);
        // Ensure that our user account is verified
        if(this.context.verified === 'true' || this.context.verified === true) {
            if(this.state.body.length > 0) {
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
                    this.editorRef.current.value = '';
                    this.previewRef.current.innerHTML = '';
    
                } else {
                    // Signal to the user that the comment could not be posted
                    this.context.notify('Your comment could not be posted at this time.');
                }
            } else {
                this.context.notify('You cannot send an empty comment.');
            }
        } else {
            this.context.notify('verify');
        }
    }

    bodyChange = rawText => {
        this.setState({body: rawText});
    }

    render() {
        return (
            <div className="comment-create-container">
                <div className="form-container">
                    <div className="form-container__group editor">
                        <label className="input__label">{this.props.title || 'Add a comment'}</label>
                        <Editor editorRef={this.editorRef} previewRef={this.previewRef} bodyChange={this.bodyChange} />
                    </div>
                    <button className="button" onClick={this.submitComment}>Submit</button>
                </div>
            </div>
        );
      }
}