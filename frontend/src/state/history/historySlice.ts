import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostStateType {
  id: string;
  title: string;
  summary: string;
  content: string;
}

const historyPostsInitState: PostStateType[] = [];

const PostsSlice = createSlice({
  name: "postsState",
  initialState: historyPostsInitState,
  reducers: {
    addPost: (state, action: PayloadAction<PostStateType>) => {
      state.push(action.payload);
    },
  },
});

export const { addPost } = PostsSlice.actions;
export default PostsSlice.reducer;
