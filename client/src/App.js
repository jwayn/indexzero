import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import RecentPosts from './components/RecentPosts';
import ArticleForm from './components/ArticleForm';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './context/auth-context';
import Post from './components/Post';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  componentDidMount() {
    //Implement remember me feature, (login.js)
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    this.setState({token, userId});
  }

  login = (token, userId) => {
    this.setState({token, userId})
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  };

  render() {
      return (
      <div className="App">
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
          <BrowserRouter>
          <Header></Header>
            <Switch>
              {!this.state.token && <Redirect from="/new_article" to="/login" exact />}
              {this.state.token && <Route path="/new_article" exact component={ArticleForm} />}
              {!this.state.token && <Route path="/login" exact component={Login} />}
              {this.state.token && <Redirect from="/login" to="/" exact />}
              <Route path="/posts/:postId" component={Post}></Route>
              <Route path="/" component={RecentPosts} />
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
