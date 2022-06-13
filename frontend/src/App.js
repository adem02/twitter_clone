import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import SingleTweet from './components/Tweet/SingleTweet';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TweetsPage from './pages/TweetsPage';

function App() {
  const { userIsLogged } = useSelector(state => state.auth)


  return (
    <Routes>

      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='landing' element={<Landing />} />

      <Route path='auth' element={!userIsLogged ? <AuthPage /> : <Navigate to='/home' replace />}>
        {/* The --auth-- path is the parent of : Login, Signup WITH Login as the default entry point */}
        <Route path='' element={<Navigate to='login' replace />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      <Route path='home' element={userIsLogged ? <HomePage /> : <Navigate to='/auth' />}>
        {/* The --home-- path is the parent of : AllTweets Displaying, SingleTweet Displaying or A --UserProfile Displaying-- */}
        <Route path='' element={<TweetsPage />} />

        <Route path='status/:tweetId' element={<SingleTweet />} />

        <Route path=':username' element={<ProfilePage />}>
          {/* The --:username-- path is the parent of : User Profile with all related Tweets to the User or A The followers/following Subpage */}
          <Route path='followers' />
          <Route path='following' />
          <Route path='followers_you_follow' />
        </Route>

      </Route>
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}

export default App;

// -- SOMERoute or SOMEPage -- : Means that the routes has children