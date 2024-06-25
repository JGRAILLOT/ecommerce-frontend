import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalPaymentButton = ({ amount, onSuccess }) => {
  return (
    <PayPalButton
      amount={amount}
      onSuccess={(details, data) => onSuccess(details, data)}
      options={{
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
      }}
    />
  );
};

export default PayPalPaymentButton;
