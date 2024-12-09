import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function UserTransactions() {
  const { id } = useParams();
  const [userTransactions, setUserTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [rawData, setrawData] = useState({});
  const [filter, setFilter] = useState({
    date: "",
    transactionState: "",
  });
  const navi = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/transaction/get-transactions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserTransactions(res.data.data.transactions);
        setFilteredTransactions(res.data.data.transactions);
        setrawData(res.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTransactions();
  }, [id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = userTransactions.filter((transaction) => {
      const matchesDate = filter.date
        ? new Date(transaction.dateTime).toISOString().slice(0, 10) ===
          filter.date
        : true;
      const matchesState = filter.transactionState
        ? transaction.transactionState === filter.transactionState
        : true;

      return matchesDate && matchesState;
    });
    setFilteredTransactions(filtered);
  };

  const resetFilters = () => {
    setFilter({ date: "", transactionState: "" });
    setFilteredTransactions(userTransactions);
  };

  function getTransactionDetails(transactionId) {
    // Destructure user and transactions data
    const { user, transactions } = rawData;

    // Find the specific transaction based on the transactionId
    const transaction = transactions.find(
      (txn) => txn.transactionIdentifier === transactionId
    );

    if (!transaction) {
      return { error: "Transaction not found" };
    }

    // Map transaction products to the desired cartData format
    const cartData = transaction.courseList.map((product) => {
      
      return {
        productId: product._id,
        name: product.title,
        cost: product.price.toLocaleString(), // Format as currency
        quantity: product.quantity
      };
    });

    // Extract transaction data
    const transactionData = {
      amount: transaction.amount.toLocaleString(), // Format as currency
      transactionState: transaction.transactionState,
      transactionIdentifier: transaction.transactionIdentifier,
      errorMessage: transaction.errorMessage,
    };
    
    return {
      UserData: {
        address: user.address,
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.contactNumber,
      },
      cartData,
      transactionData,
    };
  }

  const printInvoice = (transactionId) => {
    const { UserData, cartData, transactionData } =
      getTransactionDetails(transactionId);

    const calculateSubtotal = () => {
      return cartData.reduce(
        (acc, item) => acc + parseInt(item.cost) * parseInt(item.quantity),
        0
      );
    };

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Create the invoice content as a string
    const printContents = `
    <div style="max-width: 800px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
      <header style="display: flex; align-items: center; flex-direction: column; justify-content: space-between; padding: 20px; background-color: #c1c1c1; color: black; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <div style="display: flex; width: 100%; gap: 20px; align-items: center; margin-bottom: 20px;">
          <img src="https://psycortex.in/assets/Images/thebraintakeLogo.png" alt="Company Logo" style="width: 80px;" />
          <div style="text-align: left;">
            <h4 style="margin: 0;">Psycortex Online Education</h4>
            <p style="margin: 0;">Block no. 101/102, 2nd floor, Shriram Tower, Sadar, Nagpur-440001, Maharashtra</p>
          </div>
        </div>
        <h2 style="margin: 0; font-family: 'Exo 2', sans-serif; font-size: 28px; text-transform: uppercase; text-align: right;">Invoice</h2>
      </header>
      <div style="padding: 20px;">
        <section style="margin-bottom: 20px;">
          <h3 style="font-size: 18px; margin-bottom: 10px; font-weight: bold; color: #333;">Customer Details</h3>
          <p><strong>Name:</strong> ${UserData.name}</p>
          <p><strong>Email:</strong> ${UserData.email}</p>
          <p><strong>Phone:</strong> ${UserData.phoneNo}</p>
        </section>
        <section style="margin-bottom: 20px;">
          <h3 style="font-size: 18px; margin-bottom: 10px; font-weight: bold; color: #333;">Billing Address</h3>
          <p><strong>Street:</strong> ${UserData.address?.street}</p>
          <p><strong>Apartment:</strong> ${UserData.address?.appartmentNo}</p>
          <p><strong>City:</strong> ${UserData.address?.city}, ${
      UserData.address?.state
    }</p>
          <p><strong>Country:</strong> ${UserData.address?.country}</p>
          <p><strong>Pin Code:</strong> ${UserData.address?.postalCode}</p>
        </section>
        <section style="margin-bottom: 20px;">
          <h3 style="font-size: 18px; margin-bottom: 10px; font-weight: bold; color: #333;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartData
                .map(
                  (item, index) => `
                <tr key="${index}">
                  <td style=" padding: 10px; border: 1px solid #ddd;">${
                    item.name
                  }</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${
                    item.quantity
                  }</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${(
                    parseInt(item.cost) * parseInt(item.quantity)
                  ).toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
              <tr>
                <td colSpan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${calculateSubtotal().toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right;"><strong>Payment Mode:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Online Payment</td>
              </tr>
              <tr>
                <td colSpan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: rgb(85, 26, 139);">Total:</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: rgb(85, 26, 139);">₹${
                  transactionData.amount
                }</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section style="margin-bottom: 20px;">
          <h3 style="font-size: 18px; margin-bottom: 10px; font-weight: bold; color: #333;">Transaction Summary</h3>
          <p><strong>Transaction ID:</strong> ${
            transactionData.transactionIdentifier
          }</p>
          <p><strong>Amount:</strong> ₹${transactionData.amount}</p>
          <p><strong>Transaction Status:</strong> ${
            transactionData.transactionState
          }</p>
        </section>
      </div>
    </div>
  `;

    // Write the invoice content to the new window
    printWindow.document.write(printContents);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="UserTransactions">
      <div className="filters">
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
        />

        <div className="radio-input">
          <label>
            <input
              type="radio"
              id="value-1"
              name="transactionState"
              value="success"
              onChange={handleFilterChange}
              checked={filter.transactionState === "success"}
            />
            <span>Success</span>
          </label>
          <label>
            <input
              type="radio"
              id="value-2"
              name="transactionState"
              value="failure"
              onChange={handleFilterChange}
              checked={filter.transactionState === "failure"}
            />
            <span>Failure</span>
          </label>
          <span className="selection"></span>
        </div>
        <button onClick={applyFilters}>Apply</button>
        <button onClick={resetFilters}>Reset</button>
      </div>
      {filteredTransactions.length === 0 && (
        <h1 style={{ textAlign: "center", margin: "10vh 0px" }}>
          No Transactions
        </h1>
      )}

      <div className="transactionContainer">
        {filteredTransactions?.map((onetran, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor:
                  onetran.transactionState === "failure"
                    ? "#f8d7da"
                    : "#d4edda",
              }}
            >
              <div>
                <h2>Transaction Id:{onetran.transactionIdentifier}</h2>
                <p>Email:{onetran.userId.email}</p>
                <p>Amount: ₹{onetran.amount.toLocaleString("en-IN")}</p>
                <p>DateTime:{formatDate(onetran.dateTime)}</p>
                {onetran.transactionState === "failure" && (
                  <p>Error Message:{onetran.errorMessage}</p>
                )}
                {id === "all" ? (
                  <button
                    className="view-btn"
                    style={{
                      margin: "10px 0px",
                    }}
                    onClick={() => {
                      navi(
                        `/admin/transaction-management/${onetran.userId._id}`
                      );
                    }}
                  >
                    Go to User's Transaction to Print Invoice
                  </button>
                ) : (
                  <button
                    className="view-btn"
                    style={{
                      margin: "10px 0px",
                    }}
                    onClick={() => {
                      printInvoice(onetran.transactionIdentifier);
                    }}
                  >
                    Print Invoice
                  </button>
                )}
              </div>
              <div className="ProductsTable">
                <div>
                  <span> Sr.No</span>
                  <span> Name</span>
                  <span> Duration</span>
                  <span> Cost</span>
                  <span> Quantity</span>
                  <span> Sub Total</span>
                </div>

                {onetran.courseList?.map((oneproduct, index2) => {
                  return (
                    <div key={index2}>
                      <span> {index2 + 1}</span>
                      <span> {oneproduct.title}</span>
                      <span> {oneproduct.expectedDuration}</span>
                      <span> {oneproduct.price.toLocaleString("en-IN")}</span>
                      <span> {oneproduct.quantity}</span>
                      <span>
                        ₹{" "}
                        {(
                          oneproduct.price * oneproduct.quantity
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
