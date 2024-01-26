import { useState } from "react";
import "./App.css";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    value: "",
    type: "deposit",
    id: "",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setAllTransactions((prev) => [...prev, transaction]);
    setTransaction({ ...transaction, value: "" });
  };

  const addNewTransaction = (ev) => {
    setTransaction({
      ...transaction,
      [ev.target.name]: ev.target.value,
      id:
        allTransactions.length === 0
          ? 1
          : allTransactions[allTransactions.length - 1].id + 1,
    });
  };

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
          <option value="remove">Sacar</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      <section className="transactions">
        {allTransactions.length > 0 ? (
          allTransactions.map((el) => (
            <div className="transaction" key={el.id}>
              <p>Valor: R$ {el.value}</p>
              <p>Tipo: {el.type === "deposit" ? "Depósito" : "Saque"}</p>
              <button>Atualizar</button>
              <button>Deletar</button>
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
