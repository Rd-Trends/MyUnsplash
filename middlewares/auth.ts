import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { NextApiReq } from "../interface";

const auth = nextConnect();
auth.use((req: NextApiReq, res: NextApiResponse, next) => {
  if (!req.session.user || typeof req.session.user === "string") {
    return res.status(401).json({ message: "not logged in" });
  }
  next();
});

export default auth;
