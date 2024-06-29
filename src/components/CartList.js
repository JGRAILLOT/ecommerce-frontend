import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import orderService from "../services/orderService";
import cartService from "../services/cartService";
import authService from "../services/authService";

const CartList = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const data = authService.getCurrentUser();
  console.log(data);

  useEffect(() => {
    const fetchCart = async () => {
      const cartItems = await cartService.getCart(data.user.id);
      setCart(cartItems);
    };
    fetchCart();
  }, [data.user]);

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handlePaymentSuccess = async (details, data) => {
    const orderData = {
      userId: data.user.id,
      products: cart,
      address: address,
      paymentDetails: { id: data.orderID, details },
    };

    await orderService.createOrder(orderData);
    await cartService.clearCart(data.user.id);
    setCart([]);
    alert("Payment successful and order placed!");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.productId}>
          <h2>{item.productName}</h2>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      <h2>Shipping Address</h2>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
      />

      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: cart
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toString(),
                  },
                },
              ],
            })
          }
          onApprove={(data, actions) =>
            actions.order
              .capture()
              .then((details) => handlePaymentSuccess(details, data))
          }
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default CartList;
