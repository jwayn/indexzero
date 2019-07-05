import React, { Component } from 'react';
import CommentViewer from './CommentViewer';
import CreateComment from './CreateComment';

import moment from 'moment';

import './Comment.css';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            comments: []
        }
    }

    async componentDidMount() {
        const rawComments = await fetch(`/api/comments/parentpost=${this.props.postId}`);
        console.log(rawComments);
        if(rawComments.status === 200) {
            const comments = await rawComments.json();
            console.log('Pre-state comments: ', comments);
            this.setState({comments: comments});
            console.log(this.state.comments);
        } else {
            // Notify user of comments not loading
        }
    }

    addComment = async comment => {
        const user = await fetch(`/api/users/id=${comment.author}`);
        const jsonUser = await user.json();
        comment.display_name = jsonUser.displayName;
        console.log('Comment: ', comment);
        this.setState({comments: [...this.state.comments, comment]
            .sort((a, b) => {
                let keyA = new Date(a.created);
                let keyB = new Date(b.created);
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <CreateComment postId={this.props.postId} addComment={this.addComment}/>
                <div className="comments-container">
                    {this.state.comments && 
                        this.state.comments.map(comment => {
                            return (
                            <div className="comment" key={comment.id}>
                                <div className="comment__likes">

                                </div>
                                <div className="comment__author">
                                    <span title={moment(comment.created).format('MMMM Do YYYY, h:mm:ss a')}>Created {moment(comment.created).fromNow()} by {comment.display_name}</span>
                                </div>
                                <div className="comment__content">
                                    <CommentViewer initialValue={comment.content}/>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
            
        );
      }
}