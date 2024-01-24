import { useState } from "react";
import "./App.css";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    value: "",
    type: "deposit",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setAllTransactions((prev) => [...prev, transaction]);
    console.log(transaction);
    setTransaction({ value: "", type: "deposit" });
  };

  const addNewTransaction = (ev) => {
    setTransaction({ ...transaction, [ev.target.name]: ev.target.value });
  };

  console.log(allTransactions);

  return (
    <>
      <h2>Controle de transações</h2>

      <form action="" method="post" onSubmit={handleSubmit}>
        <label htmlFor="transaction-value">Valor: </label>
        <input
          type="number"
          name="value"
          id="transaction-value"
          onChange={addNewTransaction}
          value={transaction.value}
        />
        <select
          id="choice"
          name="type"
          value={transaction.type}
          onChange={addNewTransaction}
        >
          <option value="deposit">Depositar</option>
          <option value="remove">Retirar</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      <section className="transactions">
        {allTransactions.length > 0 ? (
          allTransactions.map((el) => (
            <div className="transaction" key={Math.floor(Math.random() * 100)}>
              <p>Valor: {el.value}</p>
              <p>Tipo: {el.type}</p>
            </div>
          ))
        ) : (
          <p>Sem transações feitas</p>
        )}
      </section>
    </>
  );
}

export default App;
