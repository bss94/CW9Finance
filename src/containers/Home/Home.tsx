import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoryThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FormTransaction from '../../components/Transacrions/FormTransaction/FormTransaction';
import {
  closeAddTransaction,
  closeEditTransaction,
  openAddTransaction,
  selectCreatingTransaction,
  selectEditTransactionId,
  selectFetchingTransactions,
  selectShowAddTransaction,
  selectShowEditTransaction,
  selectUpdatingTransaction
} from '../../store/transactionSlice';
import {createTransaction, fetchTransactions, updateTransaction} from '../../store/transactionsThunk';
import {Button} from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AppModal from '../../components/AppModal/AppModal';
import {ApiTransaction} from '../../types';
import {toast} from 'react-toastify';
import TransactionList from '../../components/Transacrions/TransactionList/TransactionList';


const Home = () => {
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectCreatingTransaction);
  const loading = useAppSelector(selectFetchingTransactions);
  const showAddForm = useAppSelector(selectShowAddTransaction);
  const showEditForm = useAppSelector(selectShowEditTransaction);
  const updating = useAppSelector(selectUpdatingTransaction);
  const editId = useAppSelector(selectEditTransactionId);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const showAddModal = () => {
    dispatch(openAddTransaction());
  };
  const hideAddModal = () => {
    dispatch(closeAddTransaction());
  };
  const hideEditModal = () => {
    dispatch(closeEditTransaction());
  };

  const onCreateSubmit = async (transaction: ApiTransaction) => {
    try {
      await dispatch(createTransaction(transaction));
      toast.success('Transaction created');
      dispatch(closeAddTransaction());
    } catch (error) {
      toast.error('Could not create transaction!');
    } finally {
      await dispatch(fetchTransactions());
    }
  };

  const onUpdateSubmit = async (apiTransaction: ApiTransaction) => {
    if (editId) {
      try {
        await dispatch(updateTransaction({editId, apiTransaction}));
        toast.success('Transaction Updated');
        dispatch(closeEditTransaction());
      } catch (error) {
        toast.error('Could not Update transaction!');
      } finally {
        await dispatch(fetchTransactions());
      }
    }
  };


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Categories</h4>
        <Button variant="outline-success" onClick={() => showAddModal()}>Add Transaction</Button>
      </div>

      {loading
        ?
        <LoadingSpinner/>
        :
        <TransactionList/>
      }
      <AppModal
        show={showAddForm}
        title={'Create Transaction'}
        onClose={() => {
          hideAddModal();
        }}
      >
        <FormTransaction sending={creating} onSubmit={onCreateSubmit}/>
      </AppModal>

      <AppModal
        show={showEditForm}
        title={'Edit Transaction'}
        onClose={() => {
          hideEditModal();
        }}
      >
        <FormTransaction sending={updating} onSubmit={onUpdateSubmit}/>
      </AppModal>


    </div>
  );
};

export default Home;