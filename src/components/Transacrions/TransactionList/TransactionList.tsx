import {useAppSelector} from '../../../app/hooks';
import {selectTransactions} from '../../../store/transactionSlice';


const TransactionList = () => {
  const transactions = useAppSelector(selectTransactions);

  /// sort transactions

  return (
    <>
      {transactions.map(item=>{
        return <></>
      })}
    </>
  );
};

export default TransactionList;