import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [paymentId, setPaymentId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const contextValue = useMemo(
    () => ({
      amount,
      setAmount,
      paymentMethod,
      setPaymentMethod,
      attachment,
      setAttachment,
      paymentId,
      setPaymentId,
      description,
      setDescription,
      status,
      setStatus,
      isPopupOpen,
      setIsPopupOpen,
    }),
    [amount, paymentMethod, attachment, paymentId, description, status, isPopupOpen]
  );

  return <PaymentContext.Provider value={contextValue}>{children}</PaymentContext.Provider>;
};

PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaymentContext;
