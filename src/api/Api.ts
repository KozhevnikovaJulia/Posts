import Axios from 'axios';

export const API = {
  getPosts() {
    return Axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`);
  },
  getProfile() {
    return Axios.get(`https://my-json-server.typicode.com/typicode/demo/profile`);
  },
  getComments() {
    return Axios.get(`https://my-json-server.typicode.com/typicode/demo/comments`);
  },
};

export type CommentType = {
  id: number;
  body: string;
  postId: number;
};
export type PostType = {
  id: number;
  title: string;
};
export type ProfileType = {
  name: string;
};
