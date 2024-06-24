"use client";

import React, { useEffect, useMemo, useState } from "react";
import classes from "./Game.module.scss";

import List from "@/components/List";
import { createEnumFromObjects, shuffleArray } from "@/components/utils";
import { SATAUS, type Countries } from "../types";

type GameProps = { data: Countries[] };

const Game: React.FC<GameProps> = ({ data }) => {
  const capitalsMap = useMemo(() => createEnumFromObjects(data), []);

  const [status, setStatus] = useState<SATAUS | undefined>(undefined);
  const [userScore, setUserScore] = useState(30);
  const [counties, setCountries] = useState(
    shuffleArray(data.map((country) => country.name))
  );
  const [capitals, setCapitals] = useState(
    shuffleArray(data.map((capital) => capital.capital))
  );

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCapital, setSelectedCapital] = useState("");

  useEffect(() => {
    let timer = undefined;

    if (selectedCountry && selectedCapital) {
      if (capitalsMap[selectedCountry] === selectedCapital) {
        setStatus(SATAUS.CORRECT);
        setUserScore((score) => score + 7);

        timer = setTimeout(() => {
          setStatus(undefined);
          setCountries((countries) =>
            countries.filter((country) => country !== selectedCountry)
          );

          setCapitals((capitals) =>
            capitals.filter((capital) => capital !== selectedCapital)
          );
          setSelectedCountry("");
          setSelectedCapital("");
        }, 1000);
      } else {
        setUserScore((score) => (score - 5 <= 0 ? 0 : score - 5));
        setStatus(SATAUS.WRONG);

        timer = setTimeout(() => {
          setStatus(undefined);
          setSelectedCountry("");
          setSelectedCapital("");
        }, 1000);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectedCountry, selectedCapital]);

  return (
    <div>
      <p className={classes.score}>{`User score ${userScore}`}</p>

      <div className={classes.listWrapper}>
        <List
          data={counties}
          selectedItem={selectedCountry}
          status={status}
          onSelect={(country) => setSelectedCountry(country)}
        />

        <List
          data={capitals}
          selectedItem={selectedCapital}
          status={status}
          onSelect={(capital) => setSelectedCapital(capital)}
        />
      </div>
    </div>
  );
};

export default Game;
