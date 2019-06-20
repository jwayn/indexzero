
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostSummary from './PostSummary';

export default class RecentPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    renderPost(data) {
        return <PostSummary key={data.id} post={data} />
    }

    componentDidMount() {
        fetch('/api/posts/recent/limit=20')
        .then(res => res.json())
        .then(posts => {
            this.setState({posts}, () => console.log('Posts fetched', posts));
        });
    }
    
    render() {
        return(
            <div className="page-container">
                <div className="page-title">
                    <div className="page-title__header">
                        <h1>
                            Recent Activity
                        </h1>
                        <div className="button-group">
                            <Link to="/new_article" className="button link--button">Create Article</Link>
                            <Link to="/new_question" className="button link--button">Ask Question</Link>
                        </div>
                    </div>
                </div>
                <div className="recent-posts">
                    <ul>
                        {this.state.posts.map(post => {
                            return this.renderPost(post);
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}