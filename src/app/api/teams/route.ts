import { NextResponse } from "next/server";
import { players } from "../players/route";
import { randomString } from "@/lib/utils";

// This would typically be a database query, but we'll use the in-memory store for this example

export let teams: { id: string; name: string; players: typeof players }[] = [];

export async function GET(_: Request) {
  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  let newTeams = await request.json();

  newTeams = newTeams.map((team) => ({
    id: randomString(10),
    ...team,
    players: [],
  }));

  teams = [...teams, ...newTeams];
  return NextResponse.json(
    { message: "Team added successfully" },
    { status: 201 }
  );
}

export async function PATCH(request: Request) {
  let response = await request.json();

  const indexOfTeam = teams.findIndex((x) => x.name === response.name);

  if (indexOfTeam > -1) {
    teams[indexOfTeam].players = response.players;
  }
  return NextResponse.json(
    { message: "Team updated successfully" },
    { status: 201 }
  );
}
