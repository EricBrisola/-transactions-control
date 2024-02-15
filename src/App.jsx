import "./App.css";
import { useTransactions } from "./customHooks/useTransactions";
import { useModal } from "./customHooks/useModal";
import Transaction from "./components/Transaction";
import TransactionForm from "./components/TransactionForm";
import Modal from "./components/Modal";
import loadingAnimation from "./assets/loading-animation.json";
import Lottie from "lottie-react";
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
    isLoading,
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
      await fetch(
        `https://transactions-control-json-server.vercel.app/transactions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );
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
    <div className="App">
      <h2 className="app-title">Controle de transações</h2>

      {isLoading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} />
        </div>
      ) : (
        <div className="transaction-app">
          <TransactionForm
            method={"post"}
            onSubmit={handleSubmit}
            htmlFor={"transaction-value"}
            idInput={"transaction-value"}
            valueInput={transaction.value}
            onChange={createNewTransaction}
            valueSelect={transaction.type}
            btnText={"Adicionar"}
            className={"main-form"}
          />

          <section className="transactions">
            <article className="transactions-header">
              <p className="header-titles" id="value-header">
                Valor
              </p>
              <p className="header-titles" id="type-header">
                Tipo
              </p>
              <p className="header-titles" id="edit-header">
                Alterar
              </p>
              <p className="header-titles" id="delete-header">
                Deletar
              </p>
            </article>
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
              <p className="no-transactions-made">Sem transações feitas</p>
            )}
            <h2
              className={
                totalBalance >= 0 ? "positive-balance" : "negative-balance"
              }
            >
              SALDO: R$
              {totalBalance}
            </h2>
          </section>
        </div>
      )}

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
            className={"modal-form"}
          />
        </Modal>
      )}
      <footer className="footer">Desenvolvido por Eric Brisola</footer>
    </div>
  );
}

export default App;
