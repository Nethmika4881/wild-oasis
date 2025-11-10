import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });
  return { cabins, error, isLoading, isError };
}

export default useGetCabins;
