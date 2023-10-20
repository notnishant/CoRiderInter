import React, { useEffect, useState,} from "react";
import "./App.css";
import {
  ArrowLeftIcon,
  DeviceCameraIcon,
  DeviceCameraVideoIcon,
  FileDirectorySymlinkIcon,
  PaperAirplaneIcon,
  PaperclipIcon,
} from "@primer/octicons-react";

interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface ApiResponse {
  chats: Chat[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

export const ChatBubble: React.FC<{ message: string; self: boolean }> = ({
  message,
  self,
}) => {
  return (
    <div
      className={`ChatBubble ${self ? "SelfChatBubble" : "OtherChatBubble"}`}
    >
      <p>{message}</p>
    </div>
  );
};
export const Reply = (): JSX.Element => {
  const [openAttachment, setOpenAttachment] = useState(false);
  return (
    <div className="reply">
      <div className="frame">
        <div className="text-div">
          <input type="text" placeholder="Type your message here" />
        </div>
        <div className="icon-div">
          <button onClick={() => setOpenAttachment(!openAttachment)}>
            <PaperclipIcon className=" attachment" size={24} />
          </button>
          <PaperAirplaneIcon size={24} />
        </div>
      </div>
      <div className={openAttachment ? "attach" : "no"}>
        <AttachmentMenu />
      </div>
    </div>
  );
};
export const AttachmentMenu = (): JSX.Element => {
  return (
    <div className="attachmentmenu">
      <ul>
        <li>
          <DeviceCameraIcon className="icon" size={20} />
        </li>
        <li>
          <DeviceCameraVideoIcon className="icon" size={20} />
        </li>
        <li>
          <FileDirectorySymlinkIcon className="icon" size={20} />
        </li>
      </ul>
    </div>
  );
};

const ChatComponent: React.FC<ApiResponse> = (data) => {
  
  return (
    <div className="ChatScreen">
      <div className="Trip">
        <div className="trip-nav">
          <div className="back">
            <ArrowLeftIcon size={24} />
            <h1>{data.name}</h1>{" "}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#a)">
              <path
                d="M9.167 3.333h-3.5c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092c-.272.535-.272 1.235-.272 2.635v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.534.272 1.235.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.092-1.093c.273-.535.273-1.235.273-2.635v-3.5m-10 2.5h1.395c.408 0 .612 0 .803-.046.17-.04.333-.108.482-.2.168-.102.312-.246.6-.535l7.97-7.969a1.768 1.768 0 0 0-2.5-2.5l-7.97 7.97c-.288.287-.432.432-.535.6a1.7 1.7 0 0 0-.2.482c-.045.191-.045.395-.045.803v1.395Z"
                stroke="#141E0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="header">
          <img
            src="https://images.unsplash.com/photo-1697441642505-0f4ce8fbe98a?auto=format&fit=crop&q=80&w=870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <p>
            From: <b>{data.from}</b> <br />
            To: <b>{data.to}</b>
          </p>
        </div>
        <hr className="linebreak" />
      </div>
      
      <div className="ChatComponent">
        {data.chats.map((chat) => (
          <div
            key={chat.id}
            className={chat.sender.self ? "self-chat" : "other-chat"}
          > <div className={chat.sender.is_kyc_verified? "kyc-badge": "no-kyc"}>
            <img src={chat.sender.image} alt="User" />
            
            </div>
            <ChatBubble message={chat.message} self={chat.sender.self} />
          </div>
        ))}
      </div>

      <Reply />
    </div>
  );
};

const App: React.FC = () => {
  const [chatData, setChatData] = useState<ApiResponse | null>(null);
  useEffect(() => {
    // Fetch chat data from the provided URL
    fetch("https://qa.corider.in/assignment/chat")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setChatData(data);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, []);

  return (
    <div className="App">
      {chatData ? <ChatComponent {...chatData} /> : <p>Loading chat data...</p>}
    </div>
  );
};

export default App;
