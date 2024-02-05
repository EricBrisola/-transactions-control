import "./App.css";
import { useTransactions } from "./customHooks/useTransactions";
import { useModal } from "./customHooks/useModal";
import Transaction from "./components/Transaction";
import TransactionForm from "./components/TransactionForm";
import Modal from "./components/Modal";
import { useState } from "react";

function App() {
  const {
    handleSubmit,
    createNewTransaction,
    deleteTransaction,
    totalBalance,
    allTransactions,
    transaction,
    getTransactions,
  } = useTransactions();

  const { isModalOpen, openModal, closeModal } = useModal();

  const [transactionToUpdate, setTransactionToUpdate] = useState({
    value: "",
    type: "",
    id: "",
  });

  const handleUpdateSubmit = (ev) => {
    ev.preventDefault();
    sendUpdatedtransaction(transactionToUpdate.id, transactionToUpdate);
    closeModal();
  };

  const sendUpdatedtransaction = async (id, updatedTransaction) => {
    try {
      await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      });
      getTransactions();
    } catch (error) {
      console.log(`não foi possível alterar a transação, erro: ${error}`);
    }
  };

  const getCurrentTransaction = (currentTransaction) => {
    setTransactionToUpdate(currentTransaction);
  };

  const handleOnChangeUpdate = (ev) => {
    setTransactionToUpdate({
      ...transactionToUpdate,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <>
      <h2>Controle de transações</h2>

      <TransactionForm
        method={"post"}
        onSubmit={handleSubmit}
        htmlFor={"transaction-value"}
        idInput={"transaction-value"}
        valueInput={transaction.value}
        onChange={createNewTransaction}
        valueSelect={transaction.type}
        btnText={"Adicionar"}
      />

      <section className="transactions">
        {allTransactions.length > 0 ? (
          allTransactions.map((el) => (
            <Transaction
              value={el.value}
              type={el.type}
              onClick={() => deleteTransaction(el.id)}
              key={el.id}
              OpenModal={() => {
                openModal();
                getCurrentTransaction(el);
              }}
            />
          ))
        ) : (
          <p>Sem transações feitas</p>
        )}
      </section>
      <h2>Saldo atual: R$ {totalBalance}</h2>
      {isModalOpen && (
        <Modal controlModal={closeModal}>
          <TransactionForm
            method={"put"}
            onSubmit={handleUpdateSubmit}
            htmlFor={"transaction-value-update"}
            idInput={"transaction-value-update"}
            valueInput={transactionToUpdate.value}
            onChange={handleOnChangeUpdate}
            valueSelect={transactionToUpdate.type}
            btnText={"Confirmar"}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
