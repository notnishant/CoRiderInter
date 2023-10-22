import React, { useEffect, useState } from "react";
import "./App.css";
import ChatComponent from "./components/ChatComponent";
import { ApiResponse } from "./components/types";

const App: React.FC = () => {
  const [chatData, setChatData] = useState<ApiResponse | null>(null);
  useEffect(() => {
    fetch("https://qa.corider.in/assignment/chat")
      .then((response) => response.json())
      .then((data) => {
        setChatData(data);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h2>Open in mobile device to see the website</h2>
      {chatData ? <ChatComponent {...chatData} /> : <p>Loading chat data...</p>}
    </div>
  );
};

export default App;
