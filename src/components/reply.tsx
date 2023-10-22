import { DeviceCameraIcon, DeviceCameraVideoIcon, FileDirectorySymlinkIcon, PaperAirplaneIcon, PaperclipIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import "./reply.css"


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