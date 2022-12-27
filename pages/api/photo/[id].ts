import nextConnect from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import Photo from "../../../models/photoModel";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import { NextApiReq, photo } from "../../../interface";

const handler = nextConnect();

handler.use(init).use(auth);

handler.delete(async (req: NextApiReq, res: NextApiResponse, next) => {
  const { id } = req.query;
  const { password } = req.body;
  try {
    const user = await User.findOne({ email: req.session.user.email });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "password is incorrect" });
    }
    await Photo.deleteOne({ _id: id });
    return res.status(200).end();
  } catch (err) {
    return res.status(500).json({ message: "an error occued" });
  }
});

export default handler;
