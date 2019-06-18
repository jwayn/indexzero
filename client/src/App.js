import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RecentPosts from './components/RecentPosts';
import ArticleForm from './components/ArticleForm';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './context/auth-context';

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthContext.Provider>
        <Header></Header>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/recent" exact component={RecentPosts} />
            <Route path="/new_article" exact component={ArticleForm} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
