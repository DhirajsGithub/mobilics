import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import classes from "../../src/styles/Home.module.css";
import Link from "next/link";

const DynamicPage = ({ resJson }) => {
  const data = resJson;
  return (
    <div>
      <div className={classes.header}>
        <p>Table</p>
        <Link className={classes.homeBtn} href="/">
          Home
        </Link>
      </div>
      <TableComp data={data} />
    </div>
  );
};

export default DynamicPage;

export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:3000/api/test/api" + params.apiId);
  const resJson = await res.json();
  return {
    props: { resJson },
  };
}
