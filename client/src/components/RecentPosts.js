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
            <div className="recent-posts">
                <ul>
                    {this.state.posts.map(post => {
                        return this.renderPost(post);
                    })}
                </ul>
            </div>
        )
    }
}