import CategoryList from '../../components/Categories/CategoryList/CategoryList';
import AppModal from '../../components/AppModal/AppModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FormCategory from '../../components/Categories/FormCategory/FormCategory';
import {Button} from 'react-bootstrap';
import {
  closeAddModal, closeEditModal,
  openAddModal,
  selectAddShow,
  selectCreatingCategory, selectEditId, selectEditShow, selectFetchCategories, selectUpdatingCategory
} from '../../store/categorySlice';
import {ApiCategory} from '../../types';
import {createCategory, fetchCategories, updateCategory} from '../../store/categoryThunk';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {fetchTransactions} from '../../store/transactionsThunk';

const Categories = () => {
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectCreatingCategory);
  const loading = useAppSelector(selectFetchCategories);
  const showAddForm = useAppSelector(selectAddShow);
  const showEditForm = useAppSelector(selectEditShow);
  const updating = useAppSelector(selectUpdatingCategory);
  const editId = useAppSelector(selectEditId);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const showAddModal = () => {
    dispatch(openAddModal());
  };
  const hideAddModal = () => {
    dispatch(closeAddModal());
  };

  const hideEditModal = () => {
    dispatch(closeEditModal());
  };

  const onCreateSubmit = async (category: ApiCategory) => {
    try {
      await dispatch(createCategory(category));
      toast.success('category created');
      dispatch(closeAddModal());
    } catch (error) {
      toast.error('Could not create category!');
    } finally {
      await dispatch(fetchCategories());
    }
  };

  const onUpdateSubmit = async (apiCategory: ApiCategory) => {
    if (editId) {
      try {
        await dispatch(updateCategory({editId, apiCategory}));
        toast.success('category Updated');
        dispatch(closeEditModal());
      } catch (error) {
        toast.error('Could not Update category!');
      } finally {
        await dispatch(fetchCategories());
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Categories</h4>
        <Button variant="outline-success" onClick={() => showAddModal()}>Add Category</Button>
      </div>

      {loading
        ?
        <LoadingSpinner/>
        :
        <CategoryList/>
      }
      <AppModal
        show={showAddForm}
        title={'Create Category'}
        onClose={() => {
          hideAddModal();
        }}
      >
        <FormCategory onSubmit={onCreateSubmit} sending={creating}/>
      </AppModal>

      <AppModal
        show={showEditForm}
        title={'Edit Category'}
        onClose={() => {
          hideEditModal();
        }}
      >
        <FormCategory onSubmit={onUpdateSubmit} sending={updating}/>
      </AppModal>
    </>
  );
};

export default Categories;