import { NextResponse } from "next/server";

export let players: { name: string; rating: number }[] = [];

export async function POST(request: Request) {
  const newPlayers = await request.json();

  if (!Array.isArray(newPlayers)) {
    return NextResponse.json({ error: "Invalid player data" }, { status: 400 });
  }

  for (const player of newPlayers) {
    if (!player.name || player.rating < 1 || player.rating > 5) {
      return NextResponse.json(
        { error: "Invalid player data" },
        { status: 400 }
      );
    }
  }

  players = [...players, ...newPlayers];
  return NextResponse.json(
    { message: "Players added successfully" },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(players);
}
