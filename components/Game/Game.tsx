"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./Game.module.scss";

import List from "@/components/List";
import { createEnumFromObjects, shuffleArray } from "@/components/utils";
import { SATAUS } from "../types";
import type { GameProps } from "./Game.types";

const Game: React.FC<GameProps> = ({ data }) => {
  const router = useRouter();

  //Използвне на useMemo за да се ограничи създаването на enum-a само до 1 път в началото
  const capitalsEnum = useMemo(() => createEnumFromObjects(data), []);

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

    //Ако е избрана Страна и Столица тогава се продължава с логиката за съвпадение
    if (selectedCountry && selectedCapital) {
      //Взима се избраната Страна и се проверява дали избраната Столица е правилната, посредством Enum-a.
      if (capitalsEnum[selectedCountry] === selectedCapital) {
        setStatus(SATAUS.CORRECT);

        //Промяна на точките на играча
        setUserScore((score) => score + 7);

        //Сетва се timer от 1сек за да се обнови/ресетне State-a, след като изтече времето
        timer = setTimeout(() => {
          setStatus(undefined);

          //Премахване на познатите елементи
          setCountries((countries) =>
            countries.filter((country) => country !== selectedCountry)
          );
          //Премахване на познатите елементи
          setCapitals((capitals) =>
            capitals.filter((capital) => capital !== selectedCapital)
          );

          //Ресетване на извраните елементи
          setSelectedCountry("");
          setSelectedCapital("");
        }, 1000);
      } else {
        setStatus(SATAUS.WRONG);

        //Промяна на точките на играча
        setUserScore((score) => (score - 5 <= 0 ? 0 : score - 5));

        //Сетва се timer от 1сек за да се ресетнане State-a, след като изтече времето
        timer = setTimeout(() => {
          setStatus(undefined);
          setSelectedCountry("");
          setSelectedCapital("");
        }, 1000);
      }
    }

    //Логика за край на играта и пренасочване към Result страницата с параметър за точките на играча в URL-a
    if (!capitals.length) {
      const params = new URLSearchParams();
      params.set("score", userScore.toString());

      router.replace(`/result?${params.toString()}`);
    }

    //Изчистване на Timer-a за да няма memory-leak-ове
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectedCountry, selectedCapital]);

  return (
    <div className={classes.gameContainer}>
      <h2 className={classes.score}>{`Score: ${userScore}`}</h2>

      <div className={classes.listWrapper}>
        <List
          data={counties}
          selectedItem={selectedCountry}
          status={status}
          onSelect={(country) =>
            status === undefined && setSelectedCountry(country)
          }
        />

        <List
          data={capitals}
          selectedItem={selectedCapital}
          status={status}
          onSelect={(capital) =>
            status === undefined && setSelectedCapital(capital)
          }
        />
      </div>
    </div>
  );
};

export default Game;
