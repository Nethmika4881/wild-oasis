// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  // const [isOpenModal, setIsOpenModal] = useState(false);

  // const handleModal = function () {
  //   setIsOpenModal((show) => !show);
  // };
  return (
    <>
      {/* <Button onClick={handleModal} variation="primary">
        Add new cabin
      </Button> */}
      {/* 
      {isOpenModal && (
        <Modal handleModal={handleModal}>
          <CreateCabinForm handleModal={handleModal} />
        </Modal>
      )} */}

      <Modal>
        <Modal.Open name="cabin-form">
          <Button variation="primary">Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCabin;
