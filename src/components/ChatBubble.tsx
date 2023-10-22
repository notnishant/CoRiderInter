import React from "react";
import "./ChatBubble.css"

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
