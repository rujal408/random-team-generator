"use client";
import useGetPlayers from "@/hooks/use-get-players";
import useGetTeam from "@/hooks/use-get-team";
import { distributeBalancedTeams } from "@/lib/utils";
import React, { useState } from "react";

const GeneratedTeam = () => {
  const [team, setTeams] = useState<any[]>([]);
  const { data: players } = useGetPlayers();
  const { data: teams } = useGetTeam();

  const generateTeam = async () => {
    if (teams && players) {
      const balancedTeam = distributeBalancedTeams(players, teams.length);
      console.log(balancedTeam);
      setTeams(balancedTeam);
    }
  };

  return (
    <div className="p-4">
      {teams && teams.length > 0 && team.length === 0 && (
        <button
          onClick={generateTeam}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Generate
        </button>
      )}
      {team.length > 0 && (
        <div className="flex flex-col gap-6">
          {team.map((t, i) => (
            <div
              key={teams[i].name}
              className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="text-black bg-gray-100 px-4 py-2">
                <h2 className="text-xl font-bold text-center">
                  {teams[i].name} ({t.total})
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {t.players.map((p) => (
                    <div key={p.name} className="flex">
                      <div className="flex-1 text-black bg-gray-100 p-2 rounded-l">
                        {p.name}
                      </div>
                      <div className="w-16 text-black bg-gray-200 p-2 rounded-r text-center">
                        {p.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneratedTeam;
