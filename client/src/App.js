import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, Route, Link } from 'react-router-dom';

import RecentPosts from './components/RecentPosts';
import ArticleForm from './components/ArticleForm';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './context/auth-context';
import Post from './components/Post';
import Verify from './components/Verify';

import './App.css';

const PageNotFound = () => (
  <div>
    404 - <Link to='/'>Go home.</Link>
  </div>
);

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  componentDidMount() {
    //Implement remember me feature, (login.js)
    const token = localStorage.getItem('jwtToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userId = localStorage.getItem('userId');
    //If token and expiration exist in local storage, and aren't expired, set state to token, otherwise clear them
    if (token && tokenExpiration && new Date(tokenExpiration) > new Date()) {
      this.setState({token, tokenExpiration, userId})
    } else {
      localStorage.clear();
    }
  }

  login = (token, userId) => {
    let d = new Date(); d.setDate( d.getDate() + 1 );
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('tokenExpiration', d);
    localStorage.setItem('userId', userId);
    this.setState({token, userId, tokenExpiration: d});
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null
    });
    localStorage.clear();
  };

  render() {
      return (
      <div className="App">
        <AuthContext.Provider value={{
          token: this.state.token,
          tokenExpiration: this.state.tokenExpiration,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
          <BrowserRouter>
            <Header />
            <Switch>
              {!this.state.token && <Route path="/login" exact component={Login} />}
              {this.state.token && <Redirect from="/login" to="/" exact={true} />}
              {this.state.token && <Route path="/new_article" exact component={ArticleForm} />}
              {!this.state.token && <Redirect from="/new_article" to="/login" exact={true} />}
              <Route path="/verify/:key" component={Verify} exact />
              <Route path="/posts/:postId" component={Post} exact />
              <Route path="/" component={RecentPosts} exact />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
