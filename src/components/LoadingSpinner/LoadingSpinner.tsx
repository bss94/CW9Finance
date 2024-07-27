import {Spinner} from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div
      className="d-block text-center">
      <Spinner variant="primary"/>
    </div>
  );
};

export default LoadingSpinner;