import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { deletePost, updatePost } from '../../../bll/Reducer';
import { useDispatch } from 'react-redux';

export type EditableSpan_PostPropsType = {
  value: string;
  postId: number;
};

export const EditableSpan_Post = React.memo(({ ...props }: EditableSpan_PostPropsType) => {
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
      updatePost(props.postId, {
        id: props.postId,
        title: title,
      })
    );
  };
  const onClickDeletePost = () => {
    dispatch(deletePost(props.postId));
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
