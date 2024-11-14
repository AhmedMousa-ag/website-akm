import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostStateType {
  id: number;
  title: string;
  summary: string;
  content: string;
  post_type: string;
}

const PostsInitState: PostStateType[] = [];

const PostsSlice = createSlice({
  name: "postsState",
  initialState: PostsInitState,
  reducers: {
    addPost: (state, action: PayloadAction<PostStateType>) => {
      state.push(action.payload);
    },
    addPostsArr: (state, action: PayloadAction<PostStateType[]>) => {
      return [...state, ...action.payload];
    },
    removePost: (state, action: PayloadAction<number>) => {
      return state.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<PostStateType>) => {
      return state.filter((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
  },
});

export const { addPost, addPostsArr, removePost, updatePost } =
  PostsSlice.actions;
export default PostsSlice.reducer;
