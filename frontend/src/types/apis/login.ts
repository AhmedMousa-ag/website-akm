export type LoginApiBody = {
  username: string;
  password: string;
};
export type LoginResponse = {
  status: boolean;
  token: string | null;
  error: string | null;
};
