import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import SpinnerBtn from '../../SpinnerBtn/SpinnerBtn';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {toast} from 'react-toastify';
import {openEditTransaction, selectDeletingTransaction} from '../../../store/transactionSlice';
import {deleteTransaction, fetchTransactions} from '../../../store/transactionsThunk';
import {Transaction} from '../../../types';
import {selectCategory} from '../../../store/categorySlice';
import dayjs from 'dayjs';

interface Props {
  transaction: Transaction;
}

const TransactionsItem: React.FC<Props> = ({transaction}) => {
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(selectDeletingTransaction);
  const categories = useAppSelector(selectCategory);
  const category = categories.find(category => category.id === transaction.category);

  const removeTransaction = async (id: string) => {
    const answer = confirm('Are you sure you want to delete this transaction?');
    if (answer) {
      try {
        await dispatch(deleteTransaction(id));
        toast.success('Transaction deleted');
      } catch (error) {
        toast.error('Could not delete transaction!');
      } finally {
        await dispatch(fetchTransactions());
      }
    }
  };
  const showEditModal = (id: string) => {
    dispatch(openEditTransaction(id));
  };
  return category && (
    <Card className="mb-2">
      <Row className="align-items-center">
        <Col className="pe-0">
          <Card.Body>
            <Card.Text>
              <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm')}</span>
            </Card.Text>
          </Card.Body>
        </Col>
        <Col>
          <Card.Body>
            <Card.Text className="text-capitalize">
              {category.title}
            </Card.Text>
          </Card.Body>
        </Col>

        <Col xs={3} className="text-end">
          <Card.Text className={category.type === 'income' ?
            "text-success text-capitalize"
            :
            "text-danger text-capitalize"}>
            {category.type === 'income' ? '+' : '-'}{transaction.amount} KGS
          </Card.Text>
        </Col>
        <Col xs={3} className="text-end">
          <Button variant="success"
                  className="mx-1"
                  onClick={() => showEditModal(transaction.id)}
          >edit</Button>

          <SpinnerBtn className="mx-1"
                      isSending={deleting === transaction.id}
                      variant="danger"
                      onClick={() => removeTransaction(transaction.id)}
          >X</SpinnerBtn>
        </Col>
      </Row>

    </Card>
  );
};

export default TransactionsItem;