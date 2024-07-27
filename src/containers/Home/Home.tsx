import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoryThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FormTransaction from '../../components/Transacrions/FormTransaction/FormTransaction';
import {
  closeAddTransaction,
  openAddTransaction,
  selectCreatingTransaction,
  selectFetchingTransactions,
  selectShowAddTransaction
} from '../../store/transactionSlice';
import {createTransaction, fetchTransactions} from '../../store/transactionsThunk';
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
  // const showEditForm = useAppSelector(selectShowEditTransaction);
  // const updating = useAppSelector(selectUpdatingTransaction);
  // const editId = useAppSelector(selectEditTransactionId);

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
  // const hideEditModal = () => {
  //   dispatch(closeEditTransaction());
  // };

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


    </div>
  );
};

export default Home;