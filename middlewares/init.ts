import nextConnect from "next-connect";
import dbConnect from "../lib/dbConnect";

const init = nextConnect();

init.use(async (req, res, next) => {
  await dbConnect();
  next();
});

export default init;
