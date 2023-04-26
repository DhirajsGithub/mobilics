import Head from "next/head";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import classes from "../../src/styles/Home.module.css";
export default function TopTen({ resJson }) {
  const topCities = resJson.topCities;
  const cityIncomes = resJson.cityIncomes;
  const [rows, setRows] = React.useState([]);
  function createData(rank, city, income) {
    return { rank, city, income };
  }
  React.useEffect(() => {
    let temp = [];
    for (let index = 0; index < topCities.length; index++) {
      temp.push(
        createData(
          index + 1,
          topCities[index],
          cityIncomes[`${topCities[index]}`]?.toFixed(2)
        )
      );
    }
    setRows(temp);
  }, []);
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
          <p style={{ textAlign: "center" }}>
            <Link className={classes.homeBtn} href="/">
              Home
            </Link>
          </p>
        </div>
        <div>
          <TableContainer style={{ width: 500 }} component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell align="center">City Name</TableCell>
                  <TableCell align="center">Average Income</TableCell>
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
                    <TableCell align="center">{row.city}</TableCell>
                    <TableCell align="center">{row.income}</TableCell>
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
