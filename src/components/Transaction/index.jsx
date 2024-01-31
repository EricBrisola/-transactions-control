/* eslint-disable react/prop-types */
function Transaction({ value, type, onClick }) {
  return (
    <div className="transaction">
      <p>Valor: R$ {value}</p>
      <p>Tipo: {type === "deposit" ? "Depósito" : "Saque"}</p>
      <button>Atualizar</button>
      <button onClick={onClick}>Deletar</button>
    </div>
  );
}

export default Transaction;
