import { useQuery } from "@tanstack/react-query";

const useGetTeam = () => {
  return useQuery({
    queryKey: ["teamList"],
    queryFn: async () => {
      const response = await fetch("/api/teams");
      const data = await response.json();
      return data;
    },
  });
};

export default useGetTeam;
