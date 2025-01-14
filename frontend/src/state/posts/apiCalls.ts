import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEDN_URL } from "../../configs/constanst";
import axios from "axios";
import { ContentBodyRequest } from "../../types/apis/content";

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
  },
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
  },
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
    return { id };
  },
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
  },
);

export const uploadPostPic = createAsyncThunk(
  "posts/postPic",
  async ({
    post_type,
    id,
    file,
  }: {
    post_type: string;
    id: number;
    file: File;
  }) => {
    const URL = `${BACKEDN_URL}/posts/upload_img/?post_type=${post_type}&id=${id}`;
    const headers = {
      Authorization: getHeaders().Authorization,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(URL, formData, { headers: headers });
    console.log("result: ");
    console.log(res);
    const data = await res.data;
    return data;
  },
);
