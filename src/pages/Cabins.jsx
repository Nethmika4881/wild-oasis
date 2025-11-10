// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";

export default function Cabins() {
  const [showAddCabinForm, setShowAddCabinForm] = useState(false);

  //use to manage remote state react query
  // useEffect(() => {
  //   async function fetchCabinData() {
  //     const res = await getCabins();
  //     console.log(res);
  //   }
  //   fetchCabinData();
  // }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sorts</p>
      </Row>

      <Row>
        <CabinTable />
        <Button
          onClick={() => setShowAddCabinForm(!showAddCabinForm)}
          variation="primary"
        >
          Add new cabin
        </Button>
        {showAddCabinForm && <CreateCabinForm />}
      </Row>
    </>
  );
}
