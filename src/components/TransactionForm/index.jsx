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
  className,
}) {
  return (
    <form method={method} onSubmit={onSubmit} className={className}>
      <label htmlFor={htmlFor} className="value-label">
        <p>Valor</p>
        <input
          type="number"
          name="value"
          id={idInput}
          onChange={onChange}
          value={valueInput}
          required={true}
          min={0}
          className="value-input"
          placeholder="1000"
        />
      </label>
      <label className="select-label">
        <p>Tipo</p>
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

      <button type="submit" className="submit-button">
        {btnText}
      </button>
    </form>
  );
}

export default TransactionForm;
