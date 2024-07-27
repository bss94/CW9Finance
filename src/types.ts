
export interface Category{
  id:string;
  name:string;
  type:'income'|'expense';
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories{
  [id:string]: ApiCategory;
}

export interface Transaction{
  id:string;
  category:string;
  amount:number;
  createdAt:string;
}
export type ApiTransaction = Omit<Transaction, 'id'>;

export interface ApiTransactions{
  [id:string]: ApiTransaction;
}

export interface AppTransaction{
  id:string;
  category:Category;
  amount:number;
  createdAt:string;
}

export interface TransactionMutation{
  category:string;
  amount:string;
  createdAt:string;
}
