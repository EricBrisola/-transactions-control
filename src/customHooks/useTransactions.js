import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    value: "",
    type: "deposit",
    id: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((resp) => resp.json())
      .then((data) => setAllTransactions(data));
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setAllTransactions((prev) => [...prev, transaction]);
    postToTransactions(transaction);
    setTransaction({ ...transaction, value: "", type: "deposit" });
  };

  const createNewTransaction = (ev) => {
    setTransaction({
      ...transaction,
      [ev.target.name]: ev.target.value,
      id: "" + Math.floor(Math.random() * 100000),
    });
  };
  //TODO: colocar try/catch em todas requisições
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

  return {
    handleSubmit,
    createNewTransaction,
    deleteTransaction,
    totalBalance,
    allTransactions,
    transaction,
  };
};
