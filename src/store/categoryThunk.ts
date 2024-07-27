import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, Category} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';


export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { state: RootState }
>(
  'categories/fetchCategories',
  async () => {
    const response = await axiosApi.get<ApiCategories | null>('/finance/categories.json');
    const categories = response.data;
    let newCategories: Category[] = [];

    if (categories) {
      newCategories = Object.keys(categories).map((key: string) => {
        const category: ApiCategory = categories[key];
        return {
          id: key,
          ...category
        };
      });
    }
    return newCategories;
  }
);

export const createCategory = createAsyncThunk<
  void,
  ApiCategory,
  { state: RootState }
>(
  'categories/createCategory',
  async (category: ApiCategory) => {
    await axiosApi.post('/finance/categories.json', category);
  }
);

export const deleteCategory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>(
  'categories/deleteCategory',
  async (categoryId: string) => {
    await axiosApi.delete(`/finance/categories/${categoryId}.json`);
  }
);

export interface UpdateArgs {
  editId: string;
  apiCategory: ApiCategory;
}

export const updateCategory = createAsyncThunk<
  void,
  UpdateArgs,
  { state: RootState }
>(
  'categories/updateCategory',
  async ({editId, apiCategory}) => {
    await axiosApi.put(`/finance/categories/${editId}.json`, apiCategory);
  }
);