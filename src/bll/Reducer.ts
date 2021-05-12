import { API, CommentType, PostType, ProfileType } from '../api/Api';
import { AppStateType } from './Store';

let initialState = {
  posts: [] as Array<PostType>,
  comments: [] as Array<CommentType>,
  profile: {} as ProfileType,
};

export const Reducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.posts };
    case 'UPDATE_POST':
      return { ...state, posts: [...state.posts.map(post => (post.id === action.postId ? (post = action.newPost) : post))] };
    case 'DELETE_POST':
      return { ...state, posts: [...state.posts.filter(post => post.id !== action.postId)] };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.newPost] };
    case 'SET_COMMENTS':
      return { ...state, comments: action.comments };
    case 'UPDATE_COMMENT':
      return { ...state, comments: [...state.comments.map(comment => (comment.id === action.commentId ? (comment = action.newComment) : comment))] };
    case 'DELETE_COMMENT':
      return { ...state, comments: [...state.comments.filter(comment => comment.id !== action.commentId)] };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.newComment] };
    case 'SET_PROFILE':
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};

//Action creators
export const setPosts = (posts: Array<PostType>) => ({ type: 'SET_POSTS', posts } as const);
export const setComments = (comments: Array<CommentType>) => ({ type: 'SET_COMMENTS', comments } as const);
export const setProfile = (profile: ProfileType) => ({ type: 'SET_PROFILE', profile } as const);
export const updatePost = (postId: number, newPost: PostType) => ({ type: 'UPDATE_POST', postId, newPost } as const);
export const deletePost = (postId: number) => ({ type: 'DELETE_POST', postId } as const);
export const addPost = (newPost: PostType) => ({ type: 'ADD_POST', newPost } as const);
export const updateComment = (commentId: number, newComment: CommentType) => ({ type: 'UPDATE_COMMENT', commentId, newComment } as const);
export const deleteComment = (commentId: number) => ({ type: 'DELETE_COMMENT', commentId } as const);
export const addComment = (newComment: CommentType) => ({ type: 'ADD_COMMENT', newComment } as const);

//Thunk creators
export const getPosts = () => async (dispatch: any, getState: () => AppStateType) => {
  try {
    const response = await API.getPosts();
    dispatch(setPosts(response.data));
  } catch (error) {}
};
export const getComments = () => async (dispatch: any, getState: () => AppStateType) => {
  try {
    const response = await API.getComments();
    dispatch(setComments(response.data));
  } catch (error) {}
};
export const getProfile = () => async (dispatch: any, getState: () => AppStateType) => {
  try {
    const response = await API.getProfile();
    dispatch(setProfile(response.data));
  } catch (error) {}
};

//types
type ActionsType = ReturnType<typeof setPosts> | ReturnType<typeof setComments> | ReturnType<typeof setProfile> | ReturnType<typeof updatePost> | ReturnType<typeof deletePost> | ReturnType<typeof updateComment> | ReturnType<typeof deleteComment> | ReturnType<typeof addComment> | ReturnType<typeof addPost>;

export type InitialStateType = typeof initialState;
