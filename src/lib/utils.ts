export function randomString(length: number = 8) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Loop to generate characters for the specified length
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }
  return result;
}

export function distributeBalancedTeams(
  players: { name: string; rating: number }[],
  numTeams: number
) {
  const totalPlayers = players.length;
  const maxPossibleTeams = Math.floor(totalPlayers / 5); // Ensure full teams
  const teamsToForm = Math.min(numTeams, maxPossibleTeams); // Limit to max possible teams

  if (teamsToForm === 0) {
    return []; // Not enough players to form a full team
  }

  // Sort players by rating in descending order (highest to lowest)
  players.sort((a, b) => b.rating - a.rating);

  // Initialize teams with total rating tracking
  let teams: any[] = Array.from({ length: teamsToForm }, () => ({
    players: [],
    totalRating: 0,
  }));

  // Distribute players
  for (let player of players.slice(0, teamsToForm * 5)) {
    // Only use needed players
    // Find the team with the lowest total rating
    teams.sort((a, b) => a.totalRating - b.totalRating);

    // Assign the player to the team with the lowest current rating
    let team = teams[0];
    team.players.push(player);
    team.totalRating += player.rating;
  }

  return teams.map((team) => team.players);
}
