// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import init from "../../middlewares/init";

const handler = nextConnect();

type Data = {
  name: string;
};

// mddlewares
// handler.use(init);

// get route
handler.get((req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: "John Doe" });
});

// for post route use
// handler.post()

// for put route use
// handler.put()

// for patch route use
// handler.patch()

// for delete route use
// handler.delete()

export default handler;
