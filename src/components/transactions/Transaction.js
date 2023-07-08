import React from "react";
import DeleteIcon from "../../assets/images/delete.svg";
import EditIcon from "../../assets/images/edit.svg";
import { useDispatch } from "react-redux";
import { editActive, removeTransaction } from "../../features/transaction/TransactionSlice";
import { numberWithCommas } from "../../utils/thousandSeparator";

function Transaction({ transaction }) {
  const { name, type, amount, id } = transaction;
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(editActive(transaction))
  }

  const handleDelete = () => {
    dispatch(removeTransaction(id))
  }
  
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link">
          <img className="icon" src={EditIcon} alt="Edit" onClick={handleEdit}/>
        </button>
        <button className="link">
          <img className="icon" src={DeleteIcon} alt="Delete" onClick={handleDelete}/>
        </button>
      </div>
    </li>
  );
}

export default Transaction;
