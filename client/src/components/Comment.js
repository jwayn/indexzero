import React, { Component } from 'react';
import CreateComment from './CreateComment';
import CommentViewer from './CommentViewer';
import moment from 'moment';

import AuthContext from '../context/auth-context';

export default class Comment extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        
        this.state = {
            isReplying: false
        }
    }

    addReply = async comment => {
        
    }

    replyToComment = () => {
        this.setState({isReplying: !this.state.isReplying})
    }

    render() {
        return (
            <div className={`comment indent-${this.props.comment.indent}`} key={this.props.comment.id}>
                <div className="comment__body">
                    <div className="comment__body__info">
                        <div className="comment__likes">
                            <span>{this.props.comment.score}</span>
                        </div>
                        <h4 title={moment(this.props.comment.created).format('MMMM Do YYYY, h:mm:ss a')}>
                            Created {moment(this.props.comment.created).fromNow()} by {this.props.comment.display_name}
                        </h4>
                        
                    </div>
                    <div className="comment__body__content">
                        <CommentViewer initialValue={this.props.comment.content}/>
                    </div>
                    <div className="comment__body__footer">
                        <div className="comment__body__footer__info">
                            <span className="fake-link" onClick={this.replyToComment}>Reply</span>
                            <AuthContext.Consumer>
                                    {context => {
                                        if(Number(context.userId) === this.props.comment.author || context.role  === 'admin' || context.role === 'mod') {
                                            return (
                                                <div className="comment__body__info__controls">
                                                    <div className="comment__body__info__edit icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                            <g>
                                                                <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="comment__body__info__delete icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                            <g>
                                                                <path d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }}
                            </AuthContext.Consumer>
                        </div>
                        {this.state.isReplying && 
                            <div className="comment__body__footer__reply">
                                    <CreateComment postId={this.props.postId} addComment={this.addReply} title="Reply to this comment" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
      }
}