import React from 'react';
import {Button, Spinner} from 'react-bootstrap';


interface Props extends React.PropsWithChildren {
  isSending: boolean;
  type?: 'button' | 'submit';
  variant?: 'success' | 'warning' | 'danger' | 'primary';
  className?: string;
  onClick?: VoidFunction;
  disabled?: boolean;
}

const SpinnerBtn: React.FC<Props> = ({
  isSending,
  type = 'button',
  variant = 'primary',
  className,
  onClick,
  disabled,
  children
}) => {
  return (
    <Button variant={variant}
            type={type}
            className={className ? className : ''}
            disabled={isSending || disabled}
            onClick={onClick}
    >
      {isSending
        ? <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
        : children
      }
    </Button>
  );
};

export default SpinnerBtn;