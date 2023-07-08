import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "./TransactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  toEdit: {},
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransaction();
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async ({ id, data }) => {
    const transaction = await updateTransaction(data, id);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// transaction slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.toEdit = action.payload;
    },
    editInActive: (state, action) => {
      state.toEdit = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        state.transactions = [];
      })

      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        state.transactions = [];
      })

      .addCase(editTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        console.log(action);
        state.isError = false;
        state.isLoading = false;

        const indexToUpdate = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );

        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      })

      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      });
  },
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
