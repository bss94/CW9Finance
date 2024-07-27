import {Category} from '../../../types';
import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {closeAddModal, openEditModal, selectDeletingCategory} from '../../../store/categorySlice';
import {deleteCategory, fetchCategories} from '../../../store/categoryThunk';
import SpinnerBtn from '../../SpinnerBtn/SpinnerBtn';
import {toast} from 'react-toastify';

interface Props {
  category: Category;
}

const CategoryItem: React.FC<Props> = ({category}) => {
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(selectDeletingCategory);

  const removeCategory = async (id: string) => {
    try {
      await dispatch(deleteCategory(id));
      toast.success('category deleted');
      dispatch(closeAddModal());
    } catch (error) {
      toast.error('Could not delete category!');
    } finally {
      await dispatch(fetchCategories());
    }
  };
  const showEditModal = (id: string) => {
    dispatch(openEditModal(id));
  };

  return (
    <Card className="mb-2">
      <Row className="align-items-center">
        <Col className="pe-0">
          <Card.Body>
            <Card.Text>
              {category.title}
            </Card.Text>
          </Card.Body>
        </Col>

        <Col xs={2} className="text-end">
          <Card.Text className={category.type === 'income' ?
            "text-success text-capitalize"
            :
            "text-danger text-capitalize"}>
            {category.type}
          </Card.Text>
        </Col>
        <Col xs={3} className="text-end">
          <Button variant="success"
                  className="mx-1"
                  onClick={() => showEditModal(category.id)}
          >edit</Button>
          <SpinnerBtn className="mx-1"
                      isSending={deleting === category.id}
                      variant="danger"
                      onClick={() => removeCategory(category.id)}
          >X</SpinnerBtn>
        </Col>
      </Row>

    </Card>
  );
};

export default CategoryItem;