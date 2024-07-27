import React from 'react';
import {Button, Modal} from 'react-bootstrap';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title?:string;
  completeBtnName:string;
  onClose: React.MouseEventHandler;
  onComplete: React.MouseEventHandler;
}

const AppModal: React.FC<Props> = ({
  show,
  title,
  completeBtnName,
  onClose,
  onComplete,
  children
}) => {
  return (
    <Modal
      show={show}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="outline-success" onClick={onComplete}>{completeBtnName}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;