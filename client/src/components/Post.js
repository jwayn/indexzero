
import React, { Component } from 'react';
import Viewer from './Viewer';
import PostInfo from './PostInfo';
import Comments from './Comments';
import './Post.css';

export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            author: {},
            post: {},
            postLoaded: false
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

        if(this.state.post && this.state.author) {
            this.setState({postLoaded: true});
        }
    }
    
    render() {
        return(
            
            <div className="page-container">
                {this.state.postLoaded && 
                    <React.Fragment>
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
                            
                            <PostInfo author={this.state.author} post={this.state.post} />
                        </div>
                        <Comments postId={this.state.post.id} />
                    </React.Fragment>
                }
            </div>
        )
    }
}