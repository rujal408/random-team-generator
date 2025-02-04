import { useQuery } from "@tanstack/react-query";

const useGetPlayers = () => {
  return useQuery({
    queryKey: ["playerList"],
    queryFn: async () => {
      const response = await fetch("/api/players");
      const data = await response.json();
      return data;
    },
  });
};

export default useGetPlayers;
