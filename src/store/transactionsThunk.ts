import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction, ApiTransactions, Transaction} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';


export const fetchTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { state: RootState }
>(
  'transactions/fetchTransactions',
  async () => {
    const response = await axiosApi.get<ApiTransactions | null>('/finance/transactions.json');
    const transactions = response.data;
    let newTransactions: Transaction[] = [];
    if (transactions) {
      newTransactions = Object.keys(transactions).map((key: string) => {
        return {
          id: key,
          ...transactions[key]
        };
      });
    }
    return newTransactions;
  }
);

export const createTransaction = createAsyncThunk<
  void,
  ApiTransaction,
  { state: RootState }
>(
  'transactions/createTransaction',
  async (transaction: ApiTransaction) => {
    await axiosApi.post('/finance/transactions.json', transaction);
  }
);

export const deleteTransaction = createAsyncThunk<
  void,
  string,
  { state: RootState }
>(
  'transactions/deleteTransaction',
  async (transactionId: string) => {
    await axiosApi.delete(`/finance/transactions/${transactionId}.json`);
  }
);

export interface UpdateArgs {
  editId: string;
  apiTransaction: ApiTransaction;
}

export const updateTransaction = createAsyncThunk<
  void,
  UpdateArgs,
  { state: RootState }
>(
  'transactions/updateTransaction',
  async ({editId, apiTransaction}) => {
    await axiosApi.put(`/finance/transactions/${editId}.json`, apiTransaction);
  }
);