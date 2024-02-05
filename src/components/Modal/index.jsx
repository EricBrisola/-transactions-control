/* eslint-disable react/prop-types */
import "./style.css";
function Modal({ children, controlModal }) {
  return (
    <div className="modal-container">
      <div className="modal">
        {children}
        <button type="button" className="close-modal" onClick={controlModal}>
          X
        </button>
      </div>
    </div>
  );
}

export default Modal;
