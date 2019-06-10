import React, { Component } from 'react';
import Post from './Post';

export default class RecentPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    renderPost(data) {
        return <Post key={data.id} value={data} />
    }

    componentDidMount() {
        fetch('/api/posts')
        .then(res => res.json())
        .then(posts => {
            this.setState({posts}, () => console.log('Posts fetched', posts));
        })
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