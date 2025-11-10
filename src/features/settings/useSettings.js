import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export function useSettings() {
  const {
    isLoading: isLoadingSettings,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  //   console.log(settings, "Settings");
  return { settings, error, isLoadingSettings };
}
