import Modal from "react-modal";
import css from "./Modal.module.css";

export const ImageModal = ({ modalIsOpen, closeModal, valueCard }) => {
  if (!valueCard) return;
  const {
    urls: { regular },
    description,
  } = valueCard;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        ariaHideApp={false}
        className={css.modal}
      >
        <div>{valueCard && <img src={regular} alt={description} />}</div>
      </Modal>
    </div>
  );
};
