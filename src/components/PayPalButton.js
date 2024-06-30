import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalPaymentButton = ({ amount, onSuccess }) => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      script.onerror = () => {
        console.error("PayPal SDK could not be loaded.");
      };
      document.body.appendChild(script);
    };

    if (window.paypal) {
      setSdkReady(true);
    } else {
      addPayPalScript();
    }
  }, []);

  return (
    <>
      {sdkReady ? (
        <PayPalButton
          amount={amount}
          onSuccess={(details, data) => onSuccess(details, data)}
          catchError={(err) => console.error("Payment Error:", err)}
          onError={(err) => console.error("Error:", err)}
          onCancel={() => console.log("Payment cancelled")}
          options={{
            clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PayPalPaymentButton;
