import React, { Component } from 'react';
import CreateComment from './CreateComment';
import Comment from './Comment';

import './Comment.css';
import AuthContext from '../context/auth-context';

export default class Comments extends Component {

    static contextType = AuthContext;

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
            this.context.notify('Comments were unable to be retrieved at this time.');
        }
    }

    addComment = async comment => {
        const user = await fetch(`/api/users/id=${comment.author}`);
        const jsonUser = await user.json();
        comment.display_name = jsonUser.displayName;
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
                <CreateComment postId={this.props.postId} addComment={this.addComment} />
                <div className="comments-container">
                    {this.state.comments && 
                        this.state.comments.map(comment => {
                            return (
                                <Comment comment={comment} postId={this.props.postId}/>
                            )
                        })
                    }
                </div>
            </React.Fragment>
            
        );
      }
}