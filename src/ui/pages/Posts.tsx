import React, { useState } from 'react';
import '../../App.css';
import { PostType } from '../../api/Api';
import { Paper, Button } from '@material-ui/core';
import { EditableSpan_Post } from '../components/editableSpan/EditableSpan_Post';
import { Modal } from '../../ui/components/Modal/Modal';
import { AddPostForm } from '../components/addItemForm/AddPostForm';

type PostsPropsType = {
  posts: Array<PostType>;
};
export const Posts = (props: PostsPropsType) => {
  const { posts } = props;
  const [activeAddPostModal, setActiveAddPostModal] = useState(false);

  return (
    <div className='App'>
      {posts.map(post => (
        <Paper key={post.id} elevation={3} style={{ margin: '10px' }}>
          <div>
            <EditableSpan_Post value={post.title} postId={post.id} />
          </div>
        </Paper>
      ))}
      <Button
        onClick={() => {
          setActiveAddPostModal(true);
        }}
        style={{ backgroundColor: 'gray' }}
      >
        Add Post
      </Button>
      <Modal activeModal={activeAddPostModal} setActiveModal={setActiveAddPostModal}>
        <AddPostForm />
      </Modal>
    </div>
  );
};
