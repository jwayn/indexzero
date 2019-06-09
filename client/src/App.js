import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({posts}, () => console.log('Posts fetched', posts));
      })
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.state.posts.map(post => 
            <li key={post.id}>
              <h3>{post.summary}</h3>
              <p>{post.content}</p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Posts;
