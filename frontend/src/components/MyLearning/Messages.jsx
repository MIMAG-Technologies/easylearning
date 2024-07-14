import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { toast } from "react-toastify";

function Messages() {
  const { userId, courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [originalUserId, setOriginalUserId] = useState("");
  const messageBoxRef = useRef(null);

  const handleImageError = (e) => {
    e.target.src = ProfilePhoto;
  };

  const fetchMessages = async () => {
    try {
      const discussion = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/getChats`,
        { courseId: courseId, userId: originalUserId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(discussion.data.messages);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    if (originalUserId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000); // Fetch messages every 10 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [originalUserId, courseId]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageText.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addChats`,
        {
          courseId: courseId,
          userId: originalUserId,
          text: messageText,
          senderId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchMessages();
      setMessageText("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("An error occurred", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${dateTime.toString().substr(0, 3)} ${dateTime.getDate()} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][dateTime.getMonth()]
    } ${dateTime.getFullYear()} ${formattedHours}:${minutes}${ampm.toLowerCase()}`;
  }

  useEffect(() => {
    if (user) {
      if (userId === "me") {
        setOriginalUserId(user.id);
      } else {
        setOriginalUserId(userId);
      }
    }
  }, [user, userId]);

  if (messages === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="module-container" style={{ paddingRight: "0px" }}>
      <div className="messageBox" ref={messageBoxRef}>
        {messages.map((onemessage, index) => (
          <div
            key={index}
            className={`onemessage ${
              user.id === onemessage.sender._id && "userchat"
            }`}
          >
            <img
              src={onemessage.sender?.profilePhotoUrl || ProfilePhoto}
              onError={handleImageError}
              alt="Profile"
            />
            <span>
              <h3>{onemessage.text}</h3>
              <p>
                {onemessage.sender.name}●{formatDateTime(onemessage.createdAt)}
              </p>
            </span>
          </div>
        ))}
      </div>
      <div className="messageSendBox">
        <input
          required
          placeholder="Message..."
          type="text"
          id="messageInput"
          onKeyDown={handleKeyPress}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button id="sendButton" onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 664 663"
          >
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Messages;
