import connectMongo from "../../../mongodb/connection";
import Test from "../../../mongodb/sampleSchema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function fetchCarEmail(req, res) {
  await connectMongo();

  try {
    await Test.find({}).then((data) => {
      if (data) {
        const users = data.slice(0);
        // Group users by city
        const usersByCity = users.reduce((acc, user) => {
          if (!acc[user.city]) {
            acc[user.city] = [];
          }
          acc[user.city].push(user);
          return acc;
        }, {});

        // Calculate the number of users in each city
        const cityCount = Object.keys(usersByCity).reduce((acc, city) => {
          acc[city] = usersByCity[city].length;
          return acc;
        }, {});

        // Sort cities by the number of users in descending order
        const sortedCities = Object.keys(cityCount).sort(
          (a, b) => cityCount[b] - cityCount[a]
        );

        // Calculate the average income of users in each of the top 10 cities
        const topCities = sortedCities.slice(0, 10);
        const cityIncomes = topCities.reduce((acc, city) => {
          const cityUsers = usersByCity[city];
          acc[city] = 0; // Initialize to 0
          if (cityCount[city] > 0) {
            // Check if city has users
            const totalIncome = cityUsers.reduce(
              (sum, user) =>
                sum + parseFloat(user.income.replace(/[^0-9.-]+/g, "")),
              0
            );
            const averageIncome = totalIncome / cityCount[city];
            acc[city] = averageIncome;
          }
          return acc;
        }, {});

        console.log("topCities ", topCities);
        console.log("cityIncomes ", cityIncomes);
        console.log("usersByCity ", usersByCity);

        res.status(201).send({ topCities, cityIncomes, usersByCity });
      } else {
        res.send(401).send("Couldn't fetched data");
      }
    });
  } catch (error) {
    console.log(error);
  }
}
