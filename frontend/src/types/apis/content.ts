export type ContentBodyRequest = {
  id?: number;
  data: {
    title: string;
    content: string;
    summary: string;
    post_type: string;
  };
};

export type PostContentResponse = {
  data: {
    id: number;
    title: string;
    content: string;
    summary: string;
    post_type: string;
  };
  status: boolean;
  error: string | undefined;
};
export type UpdateContentResponse = {
  data: {
    id: number;
    title: string;
    content: string;
    summary: string;
    post_type: string;
  };
};
export type GetContentResponse = {
  id: number;
  title: string;
  content: string;
  summary: string;
  post_type: string;
};