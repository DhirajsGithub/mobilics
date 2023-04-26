import connectMongo from "../../../mongodb/connection";
import Test from "../../../mongodb/sampleSchema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function fetchDataIncomeCar(req, res) {
  await connectMongo();
  try {
    await Test.find({
      $and: [
        { income: { $lt: 5 } },
        { car: { $in: ["BMW", "Mercedes"] } },
        { income: { $regex: /^\$[0-4](\.\d{1,2})?$/ } },
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
