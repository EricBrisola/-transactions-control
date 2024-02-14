import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    id: "",
    value: "",
    type: "deposit",
  });

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      fetch("https://transactions-control-json-server.vercel.app/transactions")
        .then((resp) => resp.json())
        .then((data) => setAllTransactions(data));
    } catch (error) {
      console.log(`Não foi possível fazer a requisição: ${error}`);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    postToTransactions(transaction);
    setTransaction({ ...transaction, value: "", type: "deposit" });
  };

  const createNewTransaction = (ev) => {
    setTransaction({
      ...transaction,
      id: "" + Math.floor(Math.random() * 100000),
      [ev.target.name]: ev.target.value,
    });
  };

  const postToTransactions = async (transaction) => {
    try {
      await fetch("https://transactions-control-json-server.vercel.app/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      getTransactions();
    } catch (error) {
      console.log(`Não foi possível fazer a requisição: ${error}`);
    }
  };

  async function deleteTransaction(id) {
    try {
      await fetch(`https://transactions-control-json-server.vercel.app/transactions/${id}`, {
        method: "DELETE",
      });
      getTransactions();
    } catch (error) {
      console.log(`Não foi possível fazer a requisição: ${error}`);
    }
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
    setAllTransactions,
    transaction,
    getTransactions,
  };
};
