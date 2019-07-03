import React, { Component } from 'react';
import './AuthorInfo.css';
import AuthContext from '../context/auth-context';
import { Route } from 'react-router-dom';

import moment from 'moment';


export default class AuthorInfo extends Component {
    
    static contextType = AuthContext;

    constructor (props) {
        super(props);
        console.log(props.post);
        this.state = {
            post: {},
            author: {}
        };
    };

    async componentWillReceiveProps(props) {
        if(this.context.token) {
            const rawLiked = await fetch(`/api/posts/${props.post.id}/like/${this.context.userId}`);
            console.log(rawLiked);
            if(rawLiked.status === 200) {
                const liked = await rawLiked.json();
                if(Number(liked.count) > 0) {
                    console.log('uhhh');
                    this.setState({liked: true});
                } else {
                    console.log('No likes');
                    this.setState({liked: false});
                }
            }
        }

        this.setState({post: props.post, author: props.author})
    }

    likePost = async event => {
        if(this.context.token) {
            if(this.state.liked) {
                await fetch(`/api/posts/${this.props.post.id}/like`, 
                {
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${this.context.token}`}
                });
                this.setState({ post: { ...this.state.post, likes: this.state.post.likes - 1}});
                this.setState({liked: false})
            } else {
                await fetch(`/api/posts/${this.props.post.id}/like`, 
                {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${this.context.token}`}
                });
                this.setState({ post: { ...this.state.post, likes: this.state.post.likes + 1}});
                this.setState({liked: true});
            }
        } else {
            window.location.assign('/login');
        }
    }

    render() {
        return(
            <div className="author-info__container">
                <div className="author-info">

                    <div className="info-container">
                        <h2>Created by {this.props.author.displayName}</h2>
                        <p>
                            <span title={moment(this.props.post.created).format('MMMM Do YYYY, h:mm:ss a')}>
                                Created {moment(this.props.post.created).format('MMMM Do YYYY, h:mm:ss a')}.
                            </span><br />
                            {this.props.post.edited && 
                            <React.Fragment>
                                <span title={moment(this.props.post.edited).format('MMMM Do YYYY, h:mm:ss a')}>
                                    Last edited {moment(this.props.post.edited).format('MMMM Do YYYY, h:mm:ss a')}
                                </span> <br />
                            </React.Fragment>
                            }
                            <span>Viewed {this.props.post.views} {this.props.post.views > 1 ? 'times' : 'time'}.</span>
                            <br />
                        </p>
                    </div>

                    <div className="like-container">
                        <span className="like-container__likes">{Number(this.state.post.likes)}</span>
                        <div className="like" onClick={this.likePost}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={this.state.liked ? 'post-like post-like--liked' : 'post-like'}>
                                <g>
                                    <path fill="#141E2C" d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"/>
                                </g>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}