"use client";

import React, { useState } from "react";
import List from "@/components/List";
import { createEnumFromObjects, shuffleArray } from "@/components/utils";
import type { Countries } from "../types";

type GameProps = { data: Countries[] };

const Game: React.FC<GameProps> = ({ data }) => {
  const [userScore, setUserScore] = useState(30);
  const [capitalsData, setCapitalsData] = useState(createEnumFromObjects(data));

  const [counties, setCountries] = useState(
    shuffleArray(data.map((country) => country.name))
  );

  const [capitals, setCapitals] = useState(
    shuffleArray(data.map((capital) => capital.capital))
  );

  console.log(capitalsData);

  return (
    <div>
      <p>{`User score ${userScore}`}</p>

      <List data={counties} />

      <List data={capitals} />
    </div>
  );
};

export default Game;
