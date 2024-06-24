import React from "react";
import dynamic from "next/dynamic";
import classes from "./game.module.scss";

const Game = dynamic(() => import("@/components/Game"), { ssr: false });

const url = "https://lenotask.000webhostapp.com/getCountiesData/";
const token = "c4caaefe5fa7dc03456136d044ab89555941a2";

type GameProps = { data: { name: string; capital: string }[] };

const GamePage: React.FC<GameProps> = (props) => {
  return (
    <div className={classes.gamePage}>
      <Game data={props.data} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default GamePage;
