import React, { useState } from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import { PostType, CommentType } from '../../api/Api';
import { Paper, Button } from '@material-ui/core';
import { EditableSpan_Comment } from '../components/editableSpan/EditableSpan_Comment';
import { Modal } from '../../ui/components/Modal/Modal';
import { AddCommentForm } from '../../ui/components/addItemForm/AddCommentForm';

type PostPropsType = {
  posts: Array<PostType>;
  comments: Array<CommentType>;
};

export const Post = (props: PostPropsType) => {
  const { posts, comments } = props;
  const { id } = useParams<{ id: string }>();
  const currentPost = posts.find(post => post.id === +id);
  const currentPostComments = comments.filter(comment => comment.postId === +id);
  const [activeAddCommentModal, setActiveAddCommentModal] = useState(false);
  return (
    <div className='App'>
      <Paper elevation={3} style={{ margin: '10px' }}>
        <div>
          {currentPost && currentPost.title}
          <p>Comments:</p>
          {currentPostComments.map(comment => (
            <div key={comment.id}>
              <EditableSpan_Comment value={comment.body} commentId={comment.id} postId={+id} />
            </div>
          ))}
          <Button
            onClick={() => {
              setActiveAddCommentModal(true);
            }}
            style={{ backgroundColor: 'gray' }}
          >
            Add comment
          </Button>
          <Modal activeModal={activeAddCommentModal} setActiveModal={setActiveAddCommentModal}>
            <AddCommentForm postId={+id} />
          </Modal>
        </div>
      </Paper>
    </div>
  );
};
