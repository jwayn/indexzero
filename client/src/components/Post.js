
import React, { Component } from 'react';
import Viewer from './Viewer';
import AuthorInfo from './AuthorInfo';
import './Post.css';

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

                <div className="post__container">
                    <div className="post-content">
                        {this.state.post.content && 
                            <Viewer initialValue={this.state.post.content} />
                        }
                    </div>

                    <AuthorInfo author={this.state.author} post={this.state.post} />
                </div>
            </div>
        )
    }
}