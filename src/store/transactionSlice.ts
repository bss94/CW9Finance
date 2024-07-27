import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Transaction} from '../types';
import {createTransaction, deleteTransaction, fetchTransactions, updateTransaction} from './transactionsThunk';


export interface TransactionState {
  transactions: Transaction[];
  fetchingTransactions: boolean;
  showAddTransaction: boolean;
  showEditTransaction: boolean;
  editTransactionId: null | string;
  deletingTransaction: string | false;
  creatingTransaction: boolean;
  updatingTransaction: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  fetchingTransactions: false,
  showAddTransaction: false,
  showEditTransaction: false,
  creatingTransaction: false,
  deletingTransaction: false,
  editTransactionId: null,
  updatingTransaction: false
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    openAddTransaction: (state) => {
      state.showAddTransaction = true;
    },
    closeAddTransaction: (state) => {
      state.showAddTransaction = false;
    },
    openEditTransaction: (state, {payload: transactionId}: PayloadAction<string>) => {
      state.showEditTransaction = true;
      state.editTransactionId = transactionId;
    },
    closeEditTransaction: (state) => {
      state.showEditTransaction = false;
      state.editTransactionId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchingTransactions = true;
    })
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchingTransactions = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, {payload: transactions}: PayloadAction<Transaction[]>) => {
        state.fetchingTransactions = false;
        state.transactions = transactions;
      })
      .addCase(createTransaction.pending, (state) => {
        state.creatingTransaction = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.creatingTransaction = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.creatingTransaction = false;
      })
      .addCase(deleteTransaction.pending, (state, {meta: {arg: id}}) => {
        state.deletingTransaction = id;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.deletingTransaction = false;

      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.deletingTransaction = false;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.updatingTransaction = true;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.updatingTransaction = false;
        state.editTransactionId = null;

      })
      .addCase(updateTransaction.rejected, (state) => {
        state.updatingTransaction = false;
      });
  },
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectFetchingTransactions: (state) => state.fetchingTransactions,
    selectShowAddTransaction: (state) => state.showAddTransaction,
    selectShowEditTransaction: (state) => state.showEditTransaction,
    selectCreatingTransaction: (state) => state.creatingTransaction,
    selectDeletingTransaction: (state) => state.deletingTransaction,
    selectUpdatingTransaction: (state) => state.updatingTransaction,
    selectEditTransactionId: (state) => state.editTransactionId,
  },
});

export const transactionReducer = transactionSlice.reducer;

export const {
  selectTransactions,
  selectFetchingTransactions,
  selectShowAddTransaction,
  selectShowEditTransaction,
  selectCreatingTransaction,
  selectUpdatingTransaction,
  selectEditTransactionId,
  selectDeletingTransaction,
} = transactionSlice.selectors;

export const {
  openAddTransaction,
  closeAddTransaction,
  closeEditTransaction,
  openEditTransaction
} = transactionSlice.actions;