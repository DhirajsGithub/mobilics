import Head from "next/head";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function TopTen({ resJson }) {
  const topCities = resJson.topCities;
  const cityIncomes = resJson.cityIncomes;
  console.log(cityIncomes);
  console.log(topCities[0]);
  const [rows, setRows] = React.useState([]);
  function createData(rank, city, income) {
    return { rank, city, income };
  }
  React.useEffect(() => {
    let temp = [];
    for (let index = 0; index < topCities.length; index++) {
      temp.push(
        createData(index, topCities[index], cityIncomes[`${topCities[index]}`])
      );
    }
    setRows(temp);
  }, []);
  console.log(rows);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Head>
          <title>Top Ten</title>
        </Head>
        <div>
          <h2 style={{ textAlign: "center" }}>Top Ten Cities</h2>
          <h3 style={{ textAlign: "center" }}>
            Having the highest number of users and their average income.
          </h3>
        </div>
        <div>
          <TableContainer style={{ width: 500 }} component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>City Name</TableCell>
                  <TableCell align="right">Average Income</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.rank}
                    </TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="right">{row.income}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/test/api5");
  const resJson = await res.json();
  return {
    props: { resJson },
  };
}
