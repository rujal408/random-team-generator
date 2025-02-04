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
  const maxPossibleTeams = Math.floor(players.length / 5);
  numTeams = Math.min(numTeams, maxPossibleTeams);

  if (numTeams === 0) {
    throw new Error("Not enough players to form a team.");
  }

  const playersPerTeam = Math.floor(players.length / numTeams);

  // Sort players in descending order of rating
  players.sort((a, b) => b.rating - a.rating);

  // Initialize teams
  let teams: any[] = Array.from({ length: numTeams }, () => ({
    players: [],
    total: 0,
  }));

  // Select only the required number of players
  players = players.slice(0, numTeams * playersPerTeam);

  // Greedy allocation: Assign each player to the team with the lowest total rating
  for (let player of players) {
    teams.sort((a, b) => a.total - b.total); // Sort teams by total rating (ascending)
    if (teams[0].players.length < playersPerTeam) {
      teams[0].players.push(player);
      teams[0].total += player.rating;
    }
  }

  // Swap optimization to fine-tune balancing
  function trySwap(): boolean {
    let improved = false;
    for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        for (let p1 = 0; p1 < teams[i].players.length; p1++) {
          for (let p2 = 0; p2 < teams[j].players.length; p2++) {
            let player1 = teams[i].players[p1];
            let player2 = teams[j].players[p2];

            let newTotalI = teams[i].total - player1.rating + player2.rating;
            let newTotalJ = teams[j].total - player2.rating + player1.rating;

            let beforeDiff = Math.abs(teams[i].total - teams[j].total);
            let afterDiff = Math.abs(newTotalI - newTotalJ);

            if (afterDiff < beforeDiff) {
              // Swap players
              teams[i].players[p1] = player2;
              teams[j].players[p2] = player1;

              teams[i].total = newTotalI;
              teams[j].total = newTotalJ;
              improved = true;
            }
          }
        }
      }
    }
    return improved;
  }

  // Keep optimizing swaps until no further improvement
  while (trySwap());

  return teams;
}
