import './ErrorMessage.scss';

const ErrorMessage = ({ message = '', className = '' }) => {
  return <p className={`error-message ${className}`}>{message}</p>;
};

export default ErrorMessage;
