"use client";

import useGetPlayers from "@/hooks/use-get-players";

export default function PlayerList() {
  const { data, isSuccess } = useGetPlayers();

  return (
    <ul className="space-y-2">
      {isSuccess &&
        data &&
        data?.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded text-black"
          >
            <span>{player.name}</span>
            <span className="bg-indigo-600 text-white px-2 py-1 rounded">
              {player.rating}
            </span>
          </li>
        ))}
    </ul>
  );
}
