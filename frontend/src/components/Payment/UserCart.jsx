import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './UserCart.css'
import { toast } from "react-toastify";

export default function UserCart() {
  const { cart, setCart } = useContext(AuthContext);
  const [tempCart, setTempCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const navi = useNavigate();

  useEffect(() => {
    const initialTempCart = JSON.parse(JSON.stringify(cart)); // Deep copy
    setTempCart(initialTempCart);
    calculateGrandTotal(initialTempCart);
  }, [cart]);

  const decrementQuantity = (index) => {
    const updatedTempCart = [...tempCart];
    if (updatedTempCart[index].quantity > 0) {
      updatedTempCart[index].quantity--;
      setTempCart(updatedTempCart);
    }
  };

  const incrementQuantity = (index) => {
    const updatedTempCart = [...tempCart];
    updatedTempCart[index].quantity++;
    setTempCart(updatedTempCart);
  };

  const calculateTotal = (item) => {
    const price = item.price;
    const total = item.quantity * price;
    return total.toLocaleString();
  };

  const updateCart = (index) => {
    // Create new arrays for both tempCart and cart
    let updatedTempCart = [...tempCart];
    let updatedCart = [...cart];

    // If quantity is 0, remove the item
    if (tempCart[index].quantity === 0) {
      updatedTempCart = tempCart.filter((_, i) => i !== index);
      updatedCart = cart.filter((_, i) => i !== index);
    } else {
      // Update the quantity in cart to match tempCart
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: tempCart[index].quantity,
      };
    }

    // Update both states
    setTempCart(updatedTempCart);
    setCart(updatedCart);

    // Update localStorage and recalculate total
    calculateGrandTotal(updatedCart);
    toast.success("Cart updated successfully");
  };

  const calculateGrandTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setGrandTotal(total);
  };

  const allItemsInCart = () => {
    return tempCart.map((item, index) => (
      <div className="oneCartItem" key={index}>
        <div className="oneCartItemInfoText">
          <h1>{item.title}</h1>
          <p>Duration:{item.expectedDuration}</p>
          <p>Level: {item.level}</p>
          <p>Price: {item.price}</p>
        </div>
        <div>
          <div id="Quantifier">
            <span onClick={() => decrementQuantity(index)}>
              <i className="fa-solid fa-minus"></i>
            </span>
            <span>{item.quantity}</span>
            <span onClick={() => incrementQuantity(index)}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          <button className="editcartbtn" onClick={() => updateCart(index)}>
            <i className="fa-solid fa-cart-arrow-down"></i> Update Cart
          </button>
        </div>
        <div className="oneCartItemCostText">
          <p style={{ fontWeight: "bolder" }}>Total: {calculateTotal(item)}</p>
        </div>
      </div>
    ));
  };

  // Check if cart is empty before rendering content
  if (cart.length === 0) {
    return (
      <div className="UserCartView">
        <h1>Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="UserCartView">
   
      {allItemsInCart()}
      <span>
        <h1>Grand Total: Rs {grandTotal.toLocaleString()}</h1>
        <div
          className="check-out-container"
          onClick={() => {
            localStorage.setItem("GrandTotal", grandTotal);
            navi("/user/checkout");
          }}
        >
          <div className="check-out-left-side">
            <div className="check-out-card">
              <div className="check-out-card-line"></div>
              <div className="check-out-buttons"></div>
            </div>
            <div className="check-out-post">
              <div className="check-out-post-line"></div>
              <div className="check-out-screen">
                <div className="check-out-dollar">$</div>
              </div>
              <div className="check-out-numbers"></div>
              <div className="check-out-numbers-line2"></div>
            </div>
          </div>
          <div className="check-out-right-side">
            <div className="check-out-new">Checkout</div>
          </div>
        </div>
      </span>
    </div>
  );
}
