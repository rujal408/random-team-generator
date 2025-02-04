import Link from "next/link";
import AddPlayerForm from "./_components/add-player-form";
import PlayerList from "./_components/player-list";

export default function Home() {
  return (
    <div>
      <Link href="/team">Go to teams</Link>
      <div className="flex gap-1">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Add Player</h2>
          <AddPlayerForm />
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Player List</h2>
          <PlayerList />
        </div>
      </div>
    </div>
  );
}
