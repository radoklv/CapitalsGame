import Link from "next/link";
import classes from "./page.module.scss";

export default function Home() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Capitals Game</h1>
      <Link href="/game" className={classes.playBtn}>
        Play Game
      </Link>
    </div>
  );
}
