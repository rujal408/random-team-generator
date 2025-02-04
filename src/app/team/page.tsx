import React from "react";
import GenerateTeamForm from "./_components/generate-team";
import TeamList from "./_components/team-list";
import Link from "next/link";
import GeneratedTeam from "./_components/generated-team";

const Team = () => {
  return (
    <div>
      <Link href="/">Go to player</Link>
      <div className="flex gap-1">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Generate Teams</h2>
          <GenerateTeamForm />
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Team List</h2>
          <TeamList />
        </div>
      </div>
      <GeneratedTeam />
    </div>
  );
};

export default Team;
