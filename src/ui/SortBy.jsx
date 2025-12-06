import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentlyActiveValue = searchParams.get("sort-by") || "";
  const handleChange = function (e) {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      currentlyActiveValue={currentlyActiveValue}
    />
  );
}

export default SortBy;
