import React from 'react';
import {Button, Modal} from 'react-bootstrap';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title?:string;
  onClose: VoidFunction;
}

const AppModal: React.FC<Props> = ({
  show,
  title,
  onClose,
  children
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton >
      <h3>{title}</h3>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;