import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import FormTransaction from './components/Transacrions/FormTransaction/FormTransaction';
import AppModal from './components/AppModal/AppModal';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {closeAddTransaction, selectCreatingTransaction, selectShowAddTransaction} from './store/transactionSlice';
import {ApiTransaction} from './types';
import {createTransaction, fetchTransactions} from './store/transactionsThunk';
import {toast} from 'react-toastify';


const App = () => {
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectCreatingTransaction);
  const showAddForm = useAppSelector(selectShowAddTransaction);

  const hideAddModal = () => {
    dispatch(closeAddTransaction());
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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={<h1>Not found!</h1>}/>
      </Routes>
      <AppModal
        show={showAddForm}
        title={'Create Transaction'}
        onClose={() => {
          hideAddModal();
        }}
      >
        <FormTransaction sending={creating} onSubmit={onCreateSubmit}/>
      </AppModal>
    </Layout>
  );
};

export default App;
