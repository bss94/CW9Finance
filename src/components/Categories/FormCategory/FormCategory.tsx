import {ApiCategory} from '../../../types';
import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import SpinnerBtn from '../../SpinnerBtn/SpinnerBtn';
import {useAppSelector} from '../../../app/hooks';
import {selectCategory, selectEditId} from '../../../store/categorySlice';

interface Props {
  onSubmit: (category: ApiCategory) => void;
  sending: boolean;
}

const emptyState: ApiCategory = {
  title: '',
  type: ''
};
const FormCategory: React.FC<Props> = ({
  onSubmit,
  sending
}) => {
  const categories = useAppSelector(selectCategory);
  const editId = useAppSelector(selectEditId);
  const existing = categories.find((category) => category.id === editId);
  const initialState: ApiCategory = existing
    ? {title: existing.title, type: existing.type}
    : emptyState;

  const [category, setCategory] = useState<ApiCategory>(initialState);

  const changeCategories = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setCategory((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...category,
    });
  };
  return (
    <Form className="mt-5" onSubmit={onFormSubmit}>
      <Form.Group as={'div'} className="mb-3 row" controlId="title">
        <Col sm={4}>
          <Form.Label>Title:</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Control
            type="text"
            name="title"
            required
            value={category.title}
            onChange={changeCategories}
          />
        </Col>
      </Form.Group>

      <Form.Group as={'div'} className="mb-3 row" controlId="type">
        <Col sm={4}>
          <Form.Label>Type</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select
            name="type"
            required
            value={category.type}
            onChange={changeCategories}
          >
            <option value="">Change type</option>
            <option value="income" className="text-success">Income</option>
            <option value="expense" className="text-danger">Expense</option>
          </Form.Select>
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

export default FormCategory;