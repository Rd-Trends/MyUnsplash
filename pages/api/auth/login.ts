import nextConnect from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";
import { NextApiReq } from "../../../interface";
import User from "../../../models/userModel";
import init from "../../../middlewares/init";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcrypt";

const handler = nextConnect();

handler.use(init);

handler.post(async (req: NextApiReq, res: NextApiResponse, next) => {
  const { email, password } = req.body;

  if (!isEmail(email)) {
    res.status(400).json({ message: "The email you entered is invalid." });
    return;
  }

  if (!password || !password) {
    res.status(400).json({ message: "Missing Field(s)." });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "this email has not been registered" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Incorrect email or password" });
  }

  req.session.user = {
    email: user.email,
    username: user.username,
    _id: user._id,
  };

  res.status(200).json(req.session.user);
});

export default handler;
