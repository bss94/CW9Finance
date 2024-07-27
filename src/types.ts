export interface Category {
  id: string;
  title: string;
  type: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface TransactionMutation {
  category: string;
  type: string;
  amount: string;
  createdAt: string;
}
