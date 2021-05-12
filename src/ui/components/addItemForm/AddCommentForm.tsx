import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addComment } from '../../../bll/Reducer';
import { useDispatch } from 'react-redux';

type AddCommentFormPropsType = {
  postId: number;
};

export const AddCommentForm = React.memo((props: AddCommentFormPropsType) => {
  const { postId } = props;
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  //Получаем случайное целое число в диапазоне от 10 до 100000. Это будет ID нового комментария.
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const newCommentId = getRandomInt(10, 100000);

  const addItemTitle = () => {
    dispatch(
      addComment({
        id: newCommentId,
        body: title,
        postId: postId,
      })
    );
    setTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemTitle();
    }
  };

  return (
    <div>
      <TextField variant='outlined' id='outlined-error-helper-text' value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
      <Button variant='contained' size='small' onClick={addItemTitle} style={{ height: '55px' }}>
        ADD
      </Button>
    </div>
  );
});
