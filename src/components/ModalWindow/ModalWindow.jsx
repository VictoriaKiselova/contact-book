import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import Modal from "react-modal";
import toast from "react-hot-toast";
import css from "./ModalWindow.module.css";

Modal.setAppElement("#root");
export default function ModalWindow({
  idToDelete,
  isModalOpen,
  setIsModalOpen,
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(idToDelete))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted!", {
          style: {
            marginTop: "85px",
            backgroundColor: "rgb(219, 137, 204)",
            color: "#fff",
            borderRadius: "20px 0",
            border: "1px solid green",
            padding: "10px",
          },
        });
      })
      .catch(error => {
        console.log(error);
      });
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      color: "#fff",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "rgb(219, 137, 204)",
      textShadow: "1px 2px 2px #000",
    },
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        className={css.containerModal}>
        <button
          className={css.closeModal}
          onClick={() => setIsModalOpen(false)}>
          <ImCross />
        </button>
        <b>Are you sure you want to delete the contact?</b>
        <button className={css.deleteBut} onClick={handleDelete}>
          Delete Contact
        </button>
      </Modal>
    </div>
  );
}
