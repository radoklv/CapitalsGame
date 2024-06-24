import React from "react";
import dynamic from "next/dynamic";
import classes from "./page.module.scss";

const Game = dynamic(() => import("@/components/Game"), { ssr: false });

const url = "https://lenotask.000webhostapp.com/getCountiesData/";
const token = "c4caaefe5fa7dc03456136d044ab89555941a2";

async function GamePage() {
  const data = await getData();

  return (
    <div className={classes.gamePage}>
      <Game data={data} />
    </div>
  );
}

async function getData() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default GamePage;
