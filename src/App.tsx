import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Posts } from './ui/pages/Posts';
import { Post } from './ui/pages/Post';
import { getPosts, getComments, getProfile } from './bll/Reducer';
import { AppStateType } from './bll/Store';
import { PostType, CommentType } from './api/Api';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, []);
  const posts = useSelector<AppStateType, Array<PostType>>(state => state.app.posts);
  const comments = useSelector<AppStateType, Array<CommentType>>(state => state.app.comments);
  return (
    <div className='App'>
      <Switch>
        <Route exact path={'/'} render={() => <Posts posts={posts} />} />
        <Route exact path={'/posts/:id?'} render={() => <Post posts={posts} comments={comments} />} />
        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>} />
        <Redirect from={'*'} to={'/'}></Redirect>
      </Switch>
    </div>
  );
}

export default App;
