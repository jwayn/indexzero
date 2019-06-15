
import React, { Component } from 'react';
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
                        <div className="page-title__header__button-group">
                            <button className="button" onClick={this.cancelArticle}>Create Article</button>
                            <button className="button" onClick={this.cancelArticle}>Ask Question</button>
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