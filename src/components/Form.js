import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editTransaction,
} from "../features/transaction/TransactionSlice";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const { isError, isLoading, toEdit } = useSelector(
    (state) => state.transaction
  );

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  useEffect(() => {
    const { id, name, type, amount } = toEdit;
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else setEditMode(false);
  }, [toEdit]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({
        id: toEdit?.id,
        data: {
          name,
          type,
          amount,
        },
      })
    );
    setEditMode(false);
    reset();
  };

  const createHandler = (e) => {
    e.preventDefault();

    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setEditMode(false);
    reset();
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? updateHandler : createHandler}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="expense"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {editMode ? "update transaction" : "add transaction"}
        </button>

        {!isLoading && isError && <p className="error">An error occured!</p>}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}

export default Form;
