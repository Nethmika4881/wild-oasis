import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useGetBookings = function () {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sort by
  const sortBy = searchParams.get("sort-by");
  //   const [field, direction] = sortBy ? sortBy.split("-") : "";
  const sortByObj =
    !sortBy || sortBy === "startDate-desc"
      ? null
      : { field: sortBy.split("-")[0], direction: sortBy.split("-")[1] };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", filter, sortByObj, page], //if filter changed then refetch the data
    queryFn: () => getBookings({ filter, sortByObj, page }),
  });

  //prefetching

  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByObj, page + 1], //if filter changed then refetch the data
      queryFn: () => getBookings({ filter, sortByObj, page: page + 1 }),
    });
  }

  if (page !== 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByObj, page - 1], //if filter changed then refetch the data
      queryFn: () => getBookings({ filter, sortByObj, page: page - 1 }),
    });
  }
  return {
    bookings,
    error,
    isLoading,
    isError,
    count,
  };
};

export default useGetBookings;
