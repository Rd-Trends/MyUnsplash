import { NextApiRequest } from "next";

export interface user {
  username: string;
  email: string;
  _id: string;
}

export interface NextApiReq extends NextApiRequest {
  session: {
    user: user;
    [x: string]: any;
  };
}

export interface photo {
  src: string;
  label: string;
  _id?: string;
}
