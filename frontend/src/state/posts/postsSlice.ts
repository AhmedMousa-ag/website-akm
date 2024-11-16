import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePost, fetchPosts, patchPost, postPost } from "./apiCalls";
import { PostContentResponse } from "../../types/apis/content";

export interface PostStateType {
  id: number;
  title: string;
  summary: string;
  content: string;
  post_type: string;
}

const PostsInitState: {
  content: PostStateType[];
  isLoading: boolean;
  error: string | undefined;
} = {
  content: [],
  isLoading: false,
  error: undefined,
};

const PostsSlice = createSlice({
  name: "postsState",
  initialState: PostsInitState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch Post
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      (state.isLoading = false), (state.content = action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Post Post
    builder.addCase(postPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      postPost.fulfilled,
      (state, action: PayloadAction<PostContentResponse>) => {
        const postsData = action.payload.data;
        (state.isLoading = false),
          (state.content = [...state.content, postsData]);
      }
    );
    builder.addCase(postPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Patch Post
    builder.addCase(patchPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      patchPost.fulfilled,
      (state, action: PayloadAction<PostStateType>) => {
        const postsData = action.payload;
        (state.isLoading = false),
          (state.content = state.content.map((post) => {
            if (post.id == postsData.id) {
              return postsData;
            } else {
              return post;
            }
          }));
      }
    );
    builder.addCase(patchPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        const postId = action.payload.id;
        state.isLoading = false;
        state.content = state.content.filter((post) => post.id !== postId);
      }
    );
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default PostsSlice.reducer;
