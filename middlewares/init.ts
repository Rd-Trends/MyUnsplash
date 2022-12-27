import nextConnect from "next-connect";
import dbConnect from "../lib/dbConnect";
import session from "../lib/session";

const init = nextConnect();

init
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(session);

export default init;
