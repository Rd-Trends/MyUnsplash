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
  const { username, email, password } = req.body;

  if (!isEmail(email)) {
    res.status(400).json({ message: "The email you entered is invalid." });
    return;
  }

  if (!password || !username || !password) {
    res.status(400).json({ message: "Missing Field(s)." });
    return;
  }

  const userExists = await User.exists({ email });

  if (userExists) {
    res.status(403).json({ message: "The email has already been used." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email: normalizeEmail(email),
    password: hashedPassword,
  });

  await user.save();
  req.session.user = {
    email,
    username,
    _id: user._id,
  };
  res.status(201).json(req.session.user);
});

export default handler;
