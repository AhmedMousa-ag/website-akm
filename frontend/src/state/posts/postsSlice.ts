import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deletePost,
  fetchPosts,
  patchPost,
  postPost,
  uploadPostPic,
} from "./apiCalls";
import { PostContentResponse } from "../../types/apis/content";

export interface PostStateType {
  id: number;
  title: string;
  summary: string;
  content: string;
  post_type: string;
  img_url: string;
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
    builder.addCase(postPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      postPost.fulfilled,
      (state, action: PayloadAction<PostContentResponse>) => {
        const postsData = action.payload.data;
        (state.isLoading = false),
          (state.content = [...state.content, postsData]);
      },
    );
    builder.addCase(postPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
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
      },
    );
    builder.addCase(patchPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        const postId = action.payload.id;
        state.isLoading = false;
        state.content = state.content.filter((post) => post.id !== postId);
      },
    );
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //=============
    builder.addCase(uploadPostPic.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      uploadPostPic.fulfilled,
      (state, action: PayloadAction<PostStateType>) => {
        //TODO double check
        state.content = state.content.map((post) => {
          if (post.id == action.payload.id) {
            post.img_url = action.payload.img_url;
          }
          return post;
        });
      },
    );
    builder.addCase(uploadPostPic.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default PostsSlice.reducer;
