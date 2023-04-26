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
            <Link href="/Tables/1">
              Users with income lower than $5 and BMW/Mercedes cars
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link href="/Tables/2">
              Male users with phone price greater than 10,000.
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link href="/Tables/3">
              Users with last name starting with &quot;M&quot;, long quotes,
              email includes last name
            </Link>
          </li>
          <li className={classes.liItem}>
            <Link href="/Tables/4">
              Users with car BMW/Mercedes/Audi and no digits in email
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
