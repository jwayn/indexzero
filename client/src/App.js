import React from 'react';
import RecentPosts from './components/RecentPosts';
//import ArticleForm from './components/ArticleForm';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <RecentPosts></RecentPosts>
    </div>
  );
}

export default App;
