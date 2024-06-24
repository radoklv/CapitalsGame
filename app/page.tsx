import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Capitals Game</h1>
      <Link href="/game">Play Game</Link>
    </div>
  );
}
