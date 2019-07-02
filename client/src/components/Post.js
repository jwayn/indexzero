
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostSummary from './PostSummary';
import Viewer from './Viewer';

import moment from 'moment';
import viewsIcon from '../images/views.svg';
import likesIcon from '../images/likes.svg';

export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            author: {},
            post: {}
        };
        this.editorRef = React.createRef();
    }

    async componentDidMount() {
        const rawPost = await fetch(`/api/posts/${this.props.match.params.postId}`)
        const jsonPost = await rawPost.json();
        this.setState({post: jsonPost.post});

        const rawAuthor = await fetch(`/api/users/id=${this.state.post.author}`);
        const jsonAuthor = await rawAuthor.json();
        await this.setState({author: jsonAuthor});

        // Add a view, only if there hasn't been one this session
        if(!sessionStorage.getItem(`viewed_post_${this.state.post.id}`)) {
            await fetch(`/api/posts/${this.props.match.params.postId}/view`, {
                method: 'PUT'
            });
            sessionStorage.setItem(`viewed_post_${this.state.post.id}`, true);
        } else {
            console.log('Already seent it');
        }
    }
    
    render() {
        return(
            <div className="page-container">
                <div className="page-title">
                    <div className="page-title__header">
                        <h1>
                            {this.state.post.summary}
                        </h1>
                    </div>
                </div>

                <div className="post-content">
                    {this.state.post.content && 
                        <Viewer initialValue={this.state.post.content} />
                    }
                </div>
                <div className="author-info">
                    <h3>By {this.state.author.displayName}</h3>
                    <h4 title={moment(this.state.post.created).format('MMMM Do YYYY, h:mm:ss a')}>
                        Created {moment(this.state.post.created).fromNow()}
                    </h4>
                    {this.state.post.edited && 
                    <h4 title={moment(this.state.post.edited).format('MMMM Do YYYY, h:mm:ss a')}>
                        Last edited {moment(this.state.post.edited).fromNow()}
                    </h4>}
                </div>
            </div>
        )
    }
}