/* eslint-disable react/prop-types */
import "./style.css";
import editTransactionImage from "../../assets/edit-transaction-image.png";
import deletetransactionImage from "../../assets/delete-transaction-image.png";
function Transaction({ value, type, onClick, OpenModal }) {
  return (
    <div className="transaction">
      <p className="transaction-values">R${value}</p>
      <p className="transaction-types">
        {type === "deposit" ? "Depósito" : "Saque"}
      </p>
      <img
        src={editTransactionImage}
        alt="edit-transaction-img"
        onClick={OpenModal}
        className="update-button"
      />
      <img
        src={deletetransactionImage}
        alt="delete-transaction-image"
        onClick={onClick}
        className="delete-button"
      />
    </div>
  );
}

export default Transaction;
