import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionToPut, setTransactionToPut] = useState({});
  const [transaction, setTransaction] = useState({
    value: "",
    type: "deposit",
    id: "",
  });

  const selectUiController = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((resp) => resp.json())
      .then((json) => setAllTransactions(json));
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setAllTransactions((prev) => [...prev, transaction]);
    postToTransactions(transaction);
    setTransaction({ ...transaction, value: "" });

    if (selectUiController.current) {
      selectUiController.current.value = "deposit";
    }
  };

  const addNewTransaction = (ev) => {
    setTransaction({
      ...transaction,
      [ev.target.name]: ev.target.value,
      id: "" + Math.floor(Math.random() * 100000),
    });
  };

  const postToTransactions = async (transaction) => {
    await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
  };

  async function deleteTransaction(id) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });

    setAllTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  }

  const totalBalance =
    allTransactions.length >= 1
      ? allTransactions.reduce((total, current) => {
          if (current.type === "deposit") {
            return (total += +current.value);
          }
          return (total -= +current.value);
        }, 0)
      : 0;

  console.log(allTransactions);

  return (
    <>
      <h2>Controle de transações</h2>

      <form
        // action="http://localhost:3000/transactions"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="transaction-value">Valor: </label>
        <input
          type="number"
          name="value"
          id="transaction-value"
          onChange={addNewTransaction}
          value={transaction.value}
          required={true}
          min={0}
        />
        <label htmlFor="choice">
          Tipo:
          <select
            id="choice"
            name="type"
            value={transaction.type}
            onChange={addNewTransaction}
            ref={selectUiController}
          >
            <option value="deposit">Depositar</option>
            <option value="remove">Sacar</option>
          </select>
        </label>

        <button type="submit">Adicionar</button>
      </form>

      <section className="transactions">
        {allTransactions.length > 0 ? (
          allTransactions.map((el) => (
            <div className="transaction" key={el.id}>
              <p>Valor: R$ {el.value}</p>
              <p>Tipo: {el.type === "deposit" ? "Depósito" : "Saque"}</p>
              <button>Atualizar</button>
              <button onClick={() => deleteTransaction(el.id)}>Deletar</button>
            </div>
          ))
        ) : (
          <p>Sem transações feitas</p>
        )}
      </section>
      <h2>Saldo atual: R$ {totalBalance}</h2>
    </>
  );
}

export default App;
