import {useAppSelector} from '../../../app/hooks';
import {selectTransactions} from '../../../store/transactionSlice';
import TransactionsItem from './TransactionsItem';


const TransactionList = () => {
  const transactions = useAppSelector(selectTransactions);

  let sortedTransactions = [...transactions];
  if (transactions.length > 0) {
    sortedTransactions = sortedTransactions.sort((first, second) => -first.createdAt.localeCompare(second.createdAt));
  }
  return (
    <>
      {sortedTransactions.map(item => {
        return <TransactionsItem transaction={item} key={item.id}/>;
      })}
    </>
  );
};

export default TransactionList;