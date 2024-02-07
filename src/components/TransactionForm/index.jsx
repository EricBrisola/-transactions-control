/* eslint-disable react/prop-types */
import "./style.css";
function TransactionForm({
  method,
  onSubmit,
  htmlFor,
  idInput,
  valueInput,
  onChange,
  valueSelect,
  btnText,
}) {
  return (
    <form method={method} onSubmit={onSubmit} className="transaction-form">
      <label htmlFor={htmlFor}>Valor: </label>
      <input
        type="number"
        name="value"
        id={idInput}
        onChange={onChange}
        value={valueInput}
        required={true}
        min={0}
        className="value-input"
      />
      <label>
        Tipo:
        <select
          name="type"
          value={valueSelect}
          onChange={onChange}
          className="select-input"
        >
          <option value="deposit">Depositar</option>
          <option value="remove">Sacar</option>
        </select>
      </label>

      <button type="submit">{btnText}</button>
    </form>
  );
}

export default TransactionForm;
