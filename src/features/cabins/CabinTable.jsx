import styled from "styled-components";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useGetCabins from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { orderBy } from "lodash";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { cabins, error, isLoading, isError } = useGetCabins();
  const [searchParams] = useSearchParams();
  if (isError) return <p>Error : {error.message}</p>;
  if (isLoading) return <Spinner />;

  //1)Filter
  console.log(cabins, "canins");
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  //2)SORT BY

  let sortedCabins = filteredCabins;

  const sortByWhat = searchParams.get("sort-by") || "name-asc";
  const [field, direction] = sortByWhat.split("-");
  sortedCabins = orderBy(sortedCabins, [field], [direction]);
  // if (sortByWhat === "name-asc")
  //   sortedCabins = orderBy(sortedCabins, ["name"], ["asc"]);

  // if (sortByWhat === "name-desc")
  //   sortedCabins = orderBy(sortedCabins, ["name"], ["desc"]);

  // if (sortByWhat === "regularPrice-asc")
  //   sortedCabins = orderBy(sortedCabins, ["regularPrice"], ["asc"]);

  // if (sortByWhat === "regularPrice-desc")
  //   sortedCabins = orderBy(sortedCabins, ["regularPrice"], ["desc"]);

  // if (sortByWhat === "maxCapacity-asc")
  //   sortedCabins = orderBy(sortedCabins, ["maxCapacity"], ["asc"]);

  // if (sortByWhat === "maxCapacity-desc")
  //   sortedCabins = orderBy(sortedCabins, ["maxCapacity"], ["desc"]);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr .5fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
