"use client";

import useGetTeam from "@/hooks/use-get-team";
import React from "react";

const TeamList = () => {
  const { data, isSuccess } = useGetTeam();

  return (
    <ul className="space-y-2">
      {isSuccess &&
        data &&
        data?.map((team, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded text-black"
          >
            <span>{team.name}</span>
          </li>
        ))}
    </ul>
  );
};

export default TeamList;
