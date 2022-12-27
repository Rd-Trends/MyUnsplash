import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import Photo from "../../../models/photoModel";
import { NextApiReq, photo } from "../../../interface";

const handler = nextConnect();

handler.use(init).use(auth);

handler
  .get(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      let userPhotos = await Photo.find(
        { ownerId: req.session.user._id },
        "src label"
      );
      return res.status(200).json(userPhotos);
    } catch (err) {
      return res.status(500).json({ message: "an error occued" });
    }
  })
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { label, src } = req.body;
      if (!label || !src) {
        res.status(400).json({ message: "Missing fields" });
      }
      const photo = new Photo({
        src,
        label,
        ownerId: req.session.user._id,
      });
      await photo.save().then((photo: photo) => {
        const { src, label, _id } = photo;
        return res.status(201).json({ src, label, _id });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

export default handler;
