import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const updateSettingMutation = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Setting Successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error("Failed to update setting");
      console.error("❌Failed to update setting:", err.message);
    },
  });

  return updateSettingMutation;
}

export default useUpdateSettings;
