import { configureStore } from '@reduxjs/toolkit';
import TransactionSlice from '../features/transaction/TransactionSlice';

export const store = configureStore({
  reducer: {
    transaction: TransactionSlice,
  },
});
