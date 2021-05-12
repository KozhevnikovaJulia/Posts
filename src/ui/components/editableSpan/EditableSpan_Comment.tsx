import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { deleteComment, updateComment } from '../../../bll/Reducer';
import { useDispatch } from 'react-redux';

export type EditableSpan_CommentPropsType = {
  value: string;
  commentId: number;
  postId: number;
};

export const EditableSpan_Comment = React.memo(({ ...props }: EditableSpan_CommentPropsType) => {
  let [editMode, seteditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>(props.value);
  const history = useHistory();
  const dispatch = useDispatch();

  const activateEditMode = () => {
    seteditMode(true);
    setTitle(props.value);
  };
  const disactivateEditMode = () => {
    seteditMode(false);
    dispatch(
      updateComment(props.commentId, {
        id: props.commentId,
        body: title,
        postId: props.postId,
      })
    );
  };
  const onClickDeletePost = () => {
    dispatch(deleteComment(props.commentId));
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {editMode ? (
        <TextField id='outlined-size-small' defaultValue='Small' variant='outlined' size='small' onChange={onChangeHandler} autoFocus onBlur={disactivateEditMode} value={title} />
      ) : (
        <span
          onClick={() => {
            history.push(`/posts/${props.postId}`);
          }}
        >
          {props.value}
        </span>
      )}
      <FontAwesomeIcon onClick={onClickDeletePost} icon={faTrash} size='1x' style={{ margin: '10px' }} />
      <FontAwesomeIcon onClick={activateEditMode} icon={faPencilAlt} size='1x' style={{ margin: '10px', zIndex: 1000 }} />
    </>
  );
});
