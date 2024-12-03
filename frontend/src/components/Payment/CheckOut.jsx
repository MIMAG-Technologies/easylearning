import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
function CheckOut() {
  const { user, setUser, cart } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in user.address) {
      // Update nested address fields
      setUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      // Update top-level fields
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted:", user);
    // Add your API call logic here
  };

  // Function to calculate the total for an item
  const calculateTotal = (item) => {
    const cost = item.price;
    const total = item.quantity * cost;
    return total.toLocaleString();
  };

  // Calculate grand total
  const calculateGrandTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const isEverythingOk =
    user.name &&
    user.email &&
    user.contactNumber &&
    user.address.country &&
    user.address.street &&
    user.address.appartmentNo &&
    user.address.city &&
    user.address.state &&
    user.address.postalCode;

  return (
    <div className="UserCheckoutView">
      <form onSubmit={handleSubmit}>
        <p className="checkoutdetailheading">Billing Details</p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Name"
          value={user.name || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={user.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="contactNumber">Phone Number</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          required
          placeholder="Phone Number"
          value={user.contactNumber || ""}
          onChange={handleChange}
        />

        <label id="companyName" htmlFor="companyName">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Company Name"
          // value={user.companyName || ""}
          // onChange={handleChange}
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          required
          name="country"
          placeholder="Country"
          value={user.address.country || ""}
          onChange={handleChange}
        />

        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          id="street"
          required
          name="street"
          placeholder="Street Address"
          value={user.address.street || ""}
          onChange={handleChange}
        />

        <label htmlFor="appartmentNo">appartmentNo</label>
        <input
          type="text"
          id="appartmentNo"
          required
          name="appartmentNo"
          placeholder="appartmentNo"
          value={user.address.appartmentNo || ""}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          placeholder="City"
          value={user.address.city || ""}
          onChange={handleChange}
        />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          required
          placeholder="State"
          value={user.address.state || ""}
          onChange={handleChange}
        />

        <label htmlFor="postalCode">Pin Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          required
          placeholder="Pin Code"
          value={user.address.postalCode || ""}
          onChange={handleChange}
        />
      </form>
      <div className="UserCheckoutViewRHS">
        <p className="checkoutdetailheading">Your Order</p>
        <div className="cartdetails">
          <div style={{ backgroundColor: "#f3f4f6" }}>Items</div>
          <div style={{ backgroundColor: "#f3f4f6" }}>Subtotal</div>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                {item.title} {`(${item.expectedDuration}) x ${item.quantity}`}
              </div>
              <div style={{ color: "#501a77" }}>Rs {calculateTotal(item)}</div>
            </React.Fragment>
          ))}
          <div style={{ backgroundColor: "#f3f4f6" }}>Total</div>
          <div style={{ color: "#501a77", fontWeight: "bold" }}>
            Rs {calculateGrandTotal(cart)}
          </div>
        </div>
        <label id="wordline-select-tc">
          <p>
            Please read all the terms and conditions carefully before making
            your payment:
          </p>
          <ul>
            <li>
              You are eligible to apply for a refund within 7 days of purchase.
            </li>
            <li>
              No chargeback requests will be accepted after 7 days from the date
              of purchase.
            </li>
            <li>
              For any chargeback or cancellation kindly mail us on
              info@psycortex.in
            </li>
          </ul>
          <p
            style={{
              marginBottom: "10px",
            }}
          >
            Kindly proceed with the payment only after reviewing our terms and
            conditions.
          </p>
        </label>
        <label id="wordline-select">
          <input
            type="checkbox"
            checked={isChecked} // Bind state to checkbox
            onChange={handleCheckboxChange} // Update state on change
          />{" "}
          You agree to all the terms & conditions mentioned on the website.
        </label>
        <label id="wordline-select">
          <input type="radio" checked />
          Pay with Worldline
          <img src="/assets/worldline-logo.svg" alt="Worldline" />
        </label>
        <button
          id={isEverythingOk ? "btnSubmit" : ""}
          style={{
            backgroundColor:
              isEverythingOk && isChecked ? "#501a77" : "#cccccc",
            cursor: isEverythingOk && isChecked ? "pointer" : "not-allowed",
            color: isEverythingOk && isChecked ? "white" : "black",
            opacity: isEverythingOk && isChecked ? 1 : 0.6,
          }}
          disabled={!(isEverythingOk && isChecked)} // Corrected condition
        >
          {!isEverythingOk ? "Please Fill Your Details First" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
