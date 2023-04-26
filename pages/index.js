import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import classes from "../src/styles/Home.module.css";

export default function Home({ resJson }) {
  return (
    <div>
      <Head>
        <title>Mobilics</title>
      </Head>
      <h1 className={classes.heading}>Hello</h1>
      <div className={classes.links}>
        <ul className={classes.uoList}>
          <li className={classes.liItem}>
            <Link
              href={{
                pathname: "/1",
                query: {
                  details:
                    "Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.",
                },
              }}
            >
              Users with low income and BMW/Mercedes cars
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link
              href={{
                pathname: "/2",
                query: {
                  details:
                    " Male Users which have phone price greater than 10,000.",
                },
              }}
            >
              Male users with expensive phones
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link
              href={{
                pathname: "/3",
                query: {
                  details:
                    "Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.",
                },
              }}
            >
              Users with last name starting with M and long quotes in email
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link
              href={{
                pathname: "/4",
                query: {
                  details:
                    "Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.",
                },
              }}
            >
              Users with luxury cars and no digits in email
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link href="/TopTen">
              Top 10 cities with highest user count and average income
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
