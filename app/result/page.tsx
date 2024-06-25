"use client";

import { useSearchParams } from "next/navigation";
import classes from "./page.module.scss";
import React from "react";
import Link from "next/link";

const ResultPage = (props: any) => {
  const searchParams = useSearchParams();

  const score = Number(searchParams.get("score"));

  let result;

  switch (true) {
    case score >= 0 && score <= 29:
      result = "Better luck next time!";
      break;
    case score >= 30 && score <= 49:
      result = "Good job!";
      break;
    case score >= 50:
      result = "Excellent! You're a geography whiz!";
      break;
  }

  return (
    <div className="container">
      <div className={classes.content}>
        <h1>{result}</h1>
        <h3>{`Your scores are: ${score}`}</h3>
        <Link href="/game" className="playBtn" replace>
          Play Againg
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
