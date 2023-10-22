import React from "react";
import { ChatBubble } from "./ChatBubble";
import { Reply } from "./reply";
import { ApiResponse } from "./types";
import { Badge, Avatar, styled } from "@mui/material";
import { ArrowLeftIcon } from "@primer/octicons-react";
import "./ChatComponent.css";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 11,
  height: 11,
}));

const ChatComponent: React.FC<ApiResponse> = (data) => {
  const dateOfOldestMessage = data.chats.sort((chat1, chat2) => {
    if (chat1.time < chat2.time) {
      return -1;
    } else if (chat1.time > chat2.time) {
      return 1;
    } else {
      return 0;
    }
  })[0].time;
  const dateBubble = (
    <div className="date-bubble">
      <p>{new Date(dateOfOldestMessage).toLocaleDateString()}</p>
    </div>
  );

  return (
    <div className="ChatScreen">
      <div className="Trip">
        <div className="trip-nav">
          <div className="back">
            <ArrowLeftIcon size={28} />
            <h1>{data.name}</h1>{" "}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        <div
          className="date-seprator"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "grey",
              marginLeft: "5vw",
            }}
          ></div>
          <div>
            <h4
              style={{
                width: "100px",
                textAlign: "center",
                color: "grey",
                fontWeight: "300",
              }}
            >
              {dateBubble}
            </h4>
          </div>
          <div
            style={{ flex: 1, height: "1px", backgroundColor: "grey" }}
          ></div>
        </div>
        {data.chats
          .sort((chat1, chat2) => {
            if (chat1.time < chat2.time) {
              return -1;
            } else if (chat1.time > chat2.time) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((chat) => (
            <div
              key={chat.id}
              className={chat.sender.self ? "self-chat" : "other-chat"}
            >
              {" "}
              <div
                className={chat.sender.is_kyc_verified ? "kyc-badge" : "no-kyc"}
              >
                <Badge
                  className="badge"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <SmallAvatar
                      className="kyc-badge"
                      alt="no-kyc"
                      src="https://img.icons8.com/color/48/instagram-verification-badge.png"
                    />
                  }
                >
                  <Avatar alt="User" src={chat.sender.image} />
                </Badge>
              </div>
              {/* UNCOMMENT TO SHOW TIME STAMP */}
              {/* <h2>{chat.time}</h2> */}
              <ChatBubble message={chat.message} self={chat.sender.self} />
            </div>
          ))}
      </div>

      <Reply />
    </div>
  );
};

export default ChatComponent;
