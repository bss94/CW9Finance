import {Category} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from './categoryThunk';

export interface CategoryState {
  categories: Category[];
  fetchCategories:boolean;
  addModalShow: boolean;
  editModalShow: boolean;
  editCategoryId: null | string;
  deletingCategory: false | string;
  creatingCategory: boolean;
  updatingCategory: boolean;
}

const initialState: CategoryState = {
  categories: [],
  fetchCategories:false,
  addModalShow: false,
  editModalShow: false,
  editCategoryId: null,
  deletingCategory: false,
  creatingCategory: false,
  updatingCategory:false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.addModalShow = true;
    },
    closeAddModal: (state) => {
      state.addModalShow = false;
    },
    openEditModal: (state,{payload:categoryId}:PayloadAction<string>) => {
      state.editModalShow = true;
      state.editCategoryId = categoryId;
    },
    closeEditModal: (state) => {
      state.editModalShow = false;
      state.editCategoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending,(state) => {
      state.fetchCategories = true;
    })
      .addCase(fetchCategories.rejected,(state) => {
        state.fetchCategories = false;
      })
      .addCase(fetchCategories.fulfilled,(state,{payload:categories}:PayloadAction<Category[]>) => {
        state.fetchCategories = false;
        state.categories = categories;
      })
      .addCase(createCategory.pending, (state) => {
        state.creatingCategory = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.creatingCategory = false;

      })
      .addCase(createCategory.rejected, (state) => {
        state.creatingCategory = false;
      })
      .addCase(deleteCategory.pending, (state, {meta: {arg: dishId}}) => {
        state.deletingCategory = dishId;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deletingCategory = false;

      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deletingCategory = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.updatingCategory = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updatingCategory = false;
        state.editCategoryId = null;

      })
      .addCase(updateCategory.rejected, (state) => {
        state.updatingCategory = false;
      });
  },
  selectors: {
    selectCategory: (state) => state.categories,
    selectFetchCategories: (state) => state.fetchCategories,
    selectAddShow:(state)=>state.addModalShow,
    selectEditShow:(state)=>state.editModalShow,
    selectEditId:(state)=>state.editCategoryId,
    selectDeletingCategory:(state)=>state.deletingCategory,
    selectCreatingCategory:(state)=>state.creatingCategory,
    selectUpdatingCategory:(state)=>state.updatingCategory,
  }
});

export const categoryReducer = categorySlice.reducer;

export const {
  openAddModal,
closeAddModal,
openEditModal,
closeEditModal
} = categorySlice.actions;

export const {
  selectCategory,
  selectFetchCategories,
  selectAddShow,
  selectEditShow,
  selectEditId,
  selectDeletingCategory,
  selectCreatingCategory,
  selectUpdatingCategory,
} = categorySlice.selectors;