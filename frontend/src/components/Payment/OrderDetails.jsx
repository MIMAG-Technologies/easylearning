import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, User, CreditCard, MapPin } from "lucide-react";
import "./OrderDetails.css"; // Importing the CSS file
import axios from "axios";

function OrderDetails() {
  const [userData, setUserData] = useState({});
  const [cartData, setCartData] = useState([]);
  const [transactionData, setTransactionData] = useState({});
  const invoiceRef = useRef();
  const [isSendingStarted, setisSendingStarted] = useState(false);
  const rawData = localStorage.getItem("OrderDetailes");

  useEffect(() => {
    if (rawData) {
      const data = JSON.parse(rawData);
      setUserData(data.UserData || {});
      setCartData(data.cartData ? JSON.parse(data.cartData) : []);
      setTransactionData(data.transactionData || {});
    }
  }, [rawData]);

  useEffect(() => {
    if (!isSendingStarted) {
      setTimeout(() => {
        sendTransactionEmail();
      }, 2000);
    }
  }, [userData,isSendingStarted]);

  const sendTransactionEmail = () => {
    const htmlContent = invoiceRef.current.innerHTML; // Get the invoice HTML content
    const email = userData.email; // User's email
    const emailisSend = localStorage.getItem("EmailSent");
    if (emailisSend === transactionData.transactionIdentifier) {
      console.log("Email Already Sent");

      return; // If email has already been sent, return
    }
    if (!userData.email) {
      console.error("Email is not available.");
      return; // If email is undefined, do not proceed
    }
    setisSendingStarted(true); // Set sending started to true
    // Call the email-sending route
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/transaction/sendMails`, {
        username: userData.name,
        cart: cartData,
        email,
        htmlContent,
      })
      .then(() => {
        console.log("Emails sent successfully.");
        localStorage.setItem(
          "EmailSent",
          transactionData.transactionIdentifier
        );
      })
      .catch((error) => {
        console.error("Failed to send emails:", error);
      });
  };

  const printInvoice = () => {
    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      `<html>
      <head>
      <title>Invoice</title>
      </head>
      <body>`
    );
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const calculateSubtotal = () => {
    return cartData.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    );
  };

  return (
    <div
      style={{
        marginTop: "18vh",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        ref={invoiceRef}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#c1c1c1",
            color: "black",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "20px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="https://psycortex.in/assets/Images/thebraintakeLogo.png"
              alt="Company Logo"
              style={{ width: "80px" }}
            />
            <div style={{ textAlign: "left" }}>
              <h4 style={{ margin: 0 }}>Psycortex Online Education</h4>
              <p style={{ margin: 0 }}>
                Block no. 101/102, 2nd floor, Shriram Tower, Sadar,
                Nagpur-440001, Maharashtra
              </p>
            </div>
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "28px",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            Invoice
          </h2>
        </header>

        <div style={{ padding: "20px" }}>
          {/* User Details Section */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <User style={{ marginRight: "10px" }} /> Customer Details
            </h3>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.contactNumber}
            </p>
          </section>

          {/* Billing Address Section */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <MapPin style={{ marginRight: "10px" }} /> Billing Address
            </h3>
            <p>
              <strong>Street:</strong> {userData.address?.street}
            </p>
            <p>
              <strong>Apartment:</strong> {userData.address?.appartmentNo}
            </p>
            <p>
              <strong>City:</strong> {userData.address?.city},{" "}
              {userData.address?.state}
            </p>
            <p>
              <strong>Country:</strong> {userData.address?.country}
            </p>
            <p>
              <strong>Pin Code:</strong> {userData.address?.postalCode}
            </p>
          </section>

          {/* Order Table */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <ShoppingCart style={{ marginRight: "10px" }} /> Order Details
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {item.title}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "right",
                      }}
                    >
                      ₹
                      {item.price *
                        item.quantity}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    <strong>Subtotal:</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    ₹{calculateSubtotal()}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    <strong>Payment Mode:</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    Online Payment
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "rgb(85, 26, 139)",
                    }}
                  >
                    Total:
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "rgb(85, 26, 139)",
                    }}
                  >
                    ₹{transactionData.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Transaction Summary */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <CreditCard style={{ marginRight: "10px" }} /> Transaction Summary
            </h3>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {transactionData.transactionIdentifier}
            </p>
            <p>
              <strong>Amount:</strong> ₹{transactionData.amount}
            </p>
            <p>
              <strong>Transaction Status:</strong>{" "}
              {transactionData.transactionState}
            </p>
          </section>
        </div>
      </div>

      <button
        style={{
          display: "block",
          margin: "40px auto 0",
          padding: "10px 20px",
          backgroundColor: "rgb(85, 26, 139)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={printInvoice}
      >
        Print Invoice
      </button>
    </div>
  );
}

export default OrderDetails;
