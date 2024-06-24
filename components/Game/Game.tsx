import React, { useEffect, useMemo, useState } from "react";
import classes from "./Game.module.scss";

import List from "@/components/List";
import { createEnumFromObjects, shuffleArray } from "@/components/utils";
import type { Countries } from "../types";

type GameProps = { data: Countries[] };

const Game: React.FC<GameProps> = ({ data }) => {
  const capitalsMap = useMemo(() => createEnumFromObjects(data), []);

  const [alertMessage, setAlertMessage] = useState("");
  const [userScore, setUserScore] = useState(30);
  const [counties, setCountries] = useState(
    shuffleArray(data.map((country) => country.name))
  );
  const [capitals, setCapitals] = useState(
    shuffleArray(data.map((capital) => capital.capital))
  );

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCapital, setSelectedCapital] = useState("");

  console.log(capitalsMap);

  useEffect(() => {
    if (selectedCountry && selectedCapital) {
      if (capitalsMap[selectedCountry] === selectedCapital) {
        setUserScore((score) => score + 7);
      } else {
        setUserScore((score) => score - 5);
      }

      setSelectedCountry("");
      setSelectedCapital("");
    }
  }, [selectedCountry, selectedCapital]);

  return (
    <div>
      <p className={classes.score}>{`User score ${userScore}`}</p>

      <div className={classes.listWrapper}>
        <List
          data={counties}
          selectedItem={selectedCountry}
          onSelect={(country) => setSelectedCountry(country)}
        />

        <List
          data={capitals}
          selectedItem={selectedCapital}
          onSelect={(capital) => setSelectedCapital(capital)}
        />
      </div>
    </div>
  );
};

export default Game;
