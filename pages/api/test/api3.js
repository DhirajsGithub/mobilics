import connectMongo from "../../../mongodb/connection";
import Test from "../../../mongodb/sampleSchema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function fetchLastNameEmail(req, res) {
  await connectMongo();

  try {
    await Test.find({
      $and: [
        { last_name: { $regex: /^M/ } },
        {
          email: {
            $regex: /M/,
            $regex: new RegExp("^\\w+\\.?\\w+@\\w+\\.\\w+(\\.\\w+)?$"),
          },
        },
        {
          $expr: { $gt: [{ $strLenCP: "$quote" }, 15] },
        },
      ],
    }).then((data) => {
      if (data) {
        res.status(201).send(data);
      } else {
        res.send(401).send("Couldn't fetched data");
      }
    });
  } catch (error) {
    console.log(error);
  }
}
