import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEDN_URL } from "../../configs/constanst";
import axios from "axios";
import {
  ContentBodyRequest,
  UpdateContentResponse,
} from "../../types/apis/content";

function getHeaders() {
  const TOKEN = localStorage.getItem("token");
  const HEADERS = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  return HEADERS;
}
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (postType: string) => {
    const URL = `${BACKEDN_URL}/posts/?post_type=${postType}`;
    const res = await axios({ url: URL, headers: getHeaders() });
    const data = await res.data;
    return data;
  }
);

export const patchPost = createAsyncThunk(
  "posts/patchPost",
  async ({ body }: { body: ContentBodyRequest }) => {
    const URL = `${BACKEDN_URL}/posts/?id=${body.id}`;
    const res = await axios({
      method: "patch",
      url: URL,
      data: body.data,
      headers: getHeaders(),
    });
    const data = await res.data;
    return data;
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id }: { id: number }) => {
    const URL = `${BACKEDN_URL}/posts/?id=${id}`;
    await axios({
      method: "delete",
      url: URL,
      headers: getHeaders(),
    });
    // const data = await res.data;
    return { id };
  }
);

export const postPost = createAsyncThunk(
  "posts/postPost",
  async ({ body }: { body: ContentBodyRequest }) => {
    const URL = `${BACKEDN_URL}/posts`;
    const res = await axios({
      method: "post",
      url: URL,
      data: body.data,
      headers: getHeaders(),
    });
    const data = await res.data;
    return data;
  }
);
