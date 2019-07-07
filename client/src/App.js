
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, Route, Link } from 'react-router-dom';

import RecentPosts from './components/RecentPosts';
import ArticleForm from './components/ArticleForm';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './context/auth-context';
import Post from './components/Post';
import Verify from './components/Verify';
import Notification from './components/Notification';
import './App.css';

const PageNotFound = () => (
  <div>
    404 - <Link to='/'>Go home.</Link>
  </div>
);

class App extends Component {
  state = {
    token: null,
    userId: null,
    verified: null,
    notifications: []
  };

  async componentDidMount() {
    //Implement remember me feature, (login.js)
    const token = localStorage.getItem('jwtToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userId = localStorage.getItem('userId');
    const verified = localStorage.getItem('verified');
    //If token and expiration exist in local storage, and aren't expired, set state to token, otherwise clear them
    if (token && tokenExpiration && verified && new Date(tokenExpiration) > new Date()) {
      await this.setState({token, tokenExpiration, userId, verified});
      if(this.state.verified === 'false') {
        this.createNotification('You will not be able to create postings, comments, or vote until you verify your account.')
      };
    } else {
      localStorage.clear();
    }
  }

  login = (token, userId, verified) => {
    console.log('From context login: ', token, userId, verified);
    let d = new Date(); d.setDate( d.getDate() + 1 );
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('tokenExpiration', d);
    localStorage.setItem('userId', userId);
    localStorage.setItem('verified', verified);
    this.setState({token, userId, tokenExpiration: d, verified});
    sessionStorage.clear();
    if(this.state.verified === false) {
      this.createNotification('You will not be able to create postings, comments, or vote until you verify your account.')
    };
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null,
      verified: null
    });
    localStorage.clear();
  };

  createNotification = (text) => {
    this.setState({notifications: [
      ...this.state.notifications,
      text
    ]});
  }

  createNewNotification = () => {
    this.setState({notifications: [
      ...this.state.notifications,
      'Test text boiiii!'
    ]})
  }

  removeNotification = (index) => {
    let notifications = [...this.state.notifications];
    notifications.splice(index, 1);
    this.setState({notifications})
  }

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
        <button onClick={this.createNewNotification}>
          Notificus Totalis!
        </button>
        <div className="notification-container">
          {this.state.notifications.map((notification, index) => {
              return (
                <Notification text={notification} id={index} key={index} close={this.removeNotification} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
