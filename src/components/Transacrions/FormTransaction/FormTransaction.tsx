import React, {useState} from 'react';
import {useAppSelector} from '../../../app/hooks';
import {selectCategory} from '../../../store/categorySlice';
import {ApiTransaction, TransactionMutation} from '../../../types';
import {Col, Form} from 'react-bootstrap';
import SpinnerBtn from '../../SpinnerBtn/SpinnerBtn';

interface Props {
  onSubmit: (transaction: ApiTransaction) => void;
  sending: boolean;
}

const FormTransaction: React.FC<Props> = ({
  onSubmit,
  sending
}) => {
  const categories = useAppSelector(selectCategory);
  // const editId = useAppSelector(selectEditId);
  // const existing = categories.find((category) => category.id === editId);
  // const initialState: ApiCategory = existing
  //   ? {title: existing.title, type: existing.type}
  //   : emptyState;

  const initialState: TransactionMutation = {
    category: '',
    type: '',
    amount: '',
    createdAt: ''
  };

  const [transactionMutation, setTransactionMutation] = useState<TransactionMutation>(initialState);

  const changeTransaction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setTransactionMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      category:transactionMutation.category,
      amount: parseFloat(transactionMutation.amount),
      createdAt: new Date().toISOString(),
    });
  };
  return (
    <Form className="mt-5" onSubmit={onFormSubmit}>
      <Form.Group as={'div'} className="mb-3 row" controlId="type">
        <Col sm={4}>
          <Form.Label>Type</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select
            name="type"
            required
            value={transactionMutation.type}
            onChange={changeTransaction}
          >
            <option value="">Change type</option>
            <option value="income" className="text-success">Income</option>
            <option value="expense" className="text-danger">Expense</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={'div'} className="mb-3 row" controlId="type">
        <Col sm={4}>
          <Form.Label>Category</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select
            name="category"
            required
            disabled={transactionMutation.type === ''}
            value={transactionMutation.category}
            onChange={changeTransaction}
          >
            <option value="">Change category</option>
            {
              categories.filter(category => category.type === transactionMutation.type).map(item => {
                return <option key={item.id} value={item.id}>{item.title}</option>;
              })
            }

          </Form.Select>
        </Col>
      </Form.Group>


      <Form.Group as={'div'} className="mb-3 row" controlId="amount">
        <Col sm={4}>
          <Form.Label>Amount:</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Control
            type="number"
            name="amount"
            min="1"
            required
            value={transactionMutation.amount}
            onChange={changeTransaction}
          />
        </Col>
      </Form.Group>


      <SpinnerBtn type="submit"
                  variant="warning"
                  isSending={sending}
                  className="text-white"
      >
        Save
      </SpinnerBtn>
    </Form>
  );
};

export default FormTransaction;