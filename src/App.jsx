import "./App.css";
import { useTransactions } from "./customHooks/useTransactions";
import Transaction from "./components/Transaction";
import Form from "./components/Form";

function App() {
  const {
    handleSubmit,
    addNewTransaction,
    deleteTransaction,
    totalBalance,
    allTransactions,
    transaction,
  } = useTransactions();

  console.log(allTransactions);

  return (
    <>
      <h2>Controle de transações</h2>

      <Form
        method={"post"}
        onSubmit={handleSubmit}
        htmlFor={"transaction-value"}
        idInput={"transaction-value"}
        valueInput={transaction.value}
        onChange={addNewTransaction}
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
            />
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
