import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { Menu, Trash } from "lucide-react";
import { Copy } from "lucide-react";
import { Pencil } from "lucide-react";
import useAddCabin from "./useAddCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);
  const deleteCabinMutation = useDeleteCabin();
  const isDeleting = deleteCabinMutation.isPending;

  const createMutation = useAddCabin();
  const isDuplicating = createMutation.isPending;

  const {
    id: cabinID,
    image,
    discount,
    maxCapacity,
    regularPrice,
    name,
  } = cabin;
  // console.log(cabin);
  // const handleModal = function () {
  //   setIsOpenModal((show) => !show);
  // };
  const handleDelete = function () {
    // const confirm = window.confirm(
    //   `Are you sure you want to delete "${name}"?`
    // );

    // if (confirm) {
    //   deleteCabinMutation.mutate(cabinID);
    // }
    // setShowConfirm((c) => !c);
    deleteCabinMutation.mutate(cabinID);
  };
  const handleDuplicate = function () {
    console.log(name);
    createMutation.mutate({
      name: `copy of ${name}`,
      regularPrice,
      maxCapacity,
      discount,
      image,
    });
  };

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? discount : "_"}</Discount>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Modal>
            <Menus.Menu>
              <Menus.Toogle id={cabinID} />
              <Menus.List id={cabinID}>
                <Menus.Button
                  icon={<Copy />}
                  disabled={isDuplicating}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open name="cabin-edit">
                  <Menus.Button icon={<Pencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open name="cabin-delete">
                  <Menus.Button icon={<Trash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="cabin-edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="cabin-delete">
                <ConfirmDelete
                  resourceName={name}
                  disabled={isDeleting}
                  onConfirm={handleDelete}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>

      {/* {showEditForm && <CreateCabinForm cabinToEdit={cabin} />} */}
      {/* {isOpenModal && (
        <Modal handleModal={handleModal}>
          <CreateCabinForm handleModal={handleModal} cabinToEdit={cabin} />
        </Modal>
      )} */}
    </>
  );
}

export default CabinRow;
