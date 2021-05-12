import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addPost } from '../../../bll/Reducer';
import { useDispatch } from 'react-redux';

export const AddPostForm = React.memo(() => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  //Получаем случайное целое число в диапазоне от 10 до 100000. Это будет ID нового поста.
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const newPostId = getRandomInt(10, 100000);

  const addItemTitle = () => {
    dispatch(
      addPost({
        id: newPostId,
        title: title,
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
