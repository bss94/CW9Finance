import {useAppSelector} from '../../../app/hooks';
import {selectTransactions} from '../../../store/transactionSlice';
import {selectCategory} from '../../../store/categorySlice';

const TransactionsTotal = () => {
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategory);

  const transactionCopy = [...transactions];
  const total = transactionCopy.reduce((acc, cur) => {
    const category = categories.find(category => category.id === cur.category);
    if (category) {
      if (category.type === 'income') {
        return acc + cur.amount;
      } else {
        return acc - cur.amount;
      }
    } else {
      return acc;
    }
  }, 0);

  return (

    <div className="p-3 mb-3 border border-2 d-flex align-items-center justify-content-evenly">
      Total: <strong className={total >= 0 ? "text-success" : "text-danger"}>  {total} KGS</strong>
    </div>
  );
};

export default TransactionsTotal;