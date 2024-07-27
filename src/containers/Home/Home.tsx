import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoryThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FormTransaction from '../../components/Transacrions/FormTransaction/FormTransaction';
import {
  closeEditTransaction,
  selectEditTransactionId,
  selectFetchingTransactions,
  selectShowEditTransaction,
  selectUpdatingTransaction
} from '../../store/transactionSlice';
import {fetchTransactions, updateTransaction} from '../../store/transactionsThunk';
import {Col, Row} from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AppModal from '../../components/AppModal/AppModal';
import {ApiTransaction} from '../../types';
import {toast} from 'react-toastify';
import TransactionList from '../../components/Transacrions/TransactionList/TransactionList';
import TransactionsTotal from '../../components/Transacrions/TransactionsTotal/TransactionsTotal';

const Home = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchingTransactions);
  const showEditForm = useAppSelector(selectShowEditTransaction);
  const updating = useAppSelector(selectUpdatingTransaction);
  const editId = useAppSelector(selectEditTransactionId);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const hideEditModal = () => {
    dispatch(closeEditTransaction());
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
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Transactions</h4>
      </div>
      <Row>
        <Col xs={4}><TransactionsTotal/></Col>
      </Row>

      {loading
        ?
        <LoadingSpinner/>
        :
        <TransactionList/>
      }

      <AppModal
        show={showEditForm}
        title={'Edit Transaction'}
        onClose={() => {
          hideEditModal();
        }}
      >
        <FormTransaction sending={updating} onSubmit={onUpdateSubmit}/>
      </AppModal>


    </>
  );
};

export default Home;