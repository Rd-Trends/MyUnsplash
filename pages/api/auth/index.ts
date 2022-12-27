import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { NextApiReq } from "../../../interface";
import init from "../../../middlewares/init";

const handler = nextConnect();
handler.use(init);
handler.get((req: NextApiReq, res: NextApiResponse, next) => {
  if (!req.session.user || typeof req.session.user === "string") {
    return res.status(401).json({ message: "not logged in" });
  } else {
    return res.status(200).json(req.session.user);
  }
});

export default handler;
