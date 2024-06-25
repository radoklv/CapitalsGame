import React from "react";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/components/Game"), { ssr: false });

const endpoint = "https://lenotask.000webhostapp.com/getCountiesData/";
const token = "c4caaefe5fa7dc03456136d044ab89555941a2";

async function GamePage() {
  //Фечване на данните тук, тъй като страниците в /app се рендерират на сървъра
  const data = await getData();

  return (
    <>
      <Game data={data} />
    </>
  );
}

async function getData() {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default GamePage;
