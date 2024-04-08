import { Avatar, Box, Stack } from "@mui/material";
import { verifiedMemberData } from "../apiServices/verify";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../types/others";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { sweetErrorHandling, sweetFailureProvider } from "../lib/sweetAlert";
import { Button, Dropdown } from "antd";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import "../../css/chatting.css";
import { CloseRounded, MessageRounded } from "@mui/icons-material";
import React from "react";
import { RippleBadge } from "../MaterialTheme/styled";
import SendIcon from "@mui/icons-material/Send";
import ReactScrollableFeed from "react-scrollable-feed";

const NewMessage = (data: any) => {
  if (data.new_mesage.mb_id == verifiedMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <div className="msg_right">{data.new_mesage.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        sx={{ m: "10px 0px" }}
      >
        <Avatar alt={data.new_mesage.mb_nick} src={data.new_mesage.mb_image} />
        <div className="msg_left">{data.new_mesage.msg}</div>
      </Box>
    );
  }
};

export function CommunityChats() {
  // INITIALIZATION
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    socket.connect();
    console.log("PRINTED");
    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });
    socket?.on("newMsg", (new_mesage: ChatMessage) => {
      console.log("CLIENT: new message");
      messagesList.push(
        //@ts-ignore
        <NewMessage new_mesage={new_mesage} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT: greet message");
      messagesList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessagesList([...messagesList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: info message");
      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /**HANDLER */
  const getInputMesageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first", true);
        return false;
      }
      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_image_url =
        verifiedMemberData?.mb_image ?? "/icons/default_img.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
    } catch (err: any) {
      console.log("onClickhandler, Error", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-btn" onClick={toggleDropdown}>
        <MapsUgcIcon sx={{ color: "red" }} fontSize="large" />
      </button>
      <div className="dropdown-content">
        <Box className={"chat_top"}>
          {" "}
          <div>Live Chat</div>{" "}
          <RippleBadge
            style={{ margin: "-30px 0 0 20px" }}
            badgeContent={onlineUsers}
          />
        </Box>
        <Box className={"chat_content"}>
          <ReactScrollableFeed>
            <Stack className="chat_main">
              <Box
                flexDirection={"row"}
                style={{ display: "flex" }}
                sx={{ m: "10px 0px" }}
              ></Box>
              {messagesList}
            </Stack>
          </ReactScrollableFeed>
        </Box>
        <Box className={"chat_bott"}>
          <input
            ref={textInput}
            type="text"
            name="message"
            className="msg_input"
            placeholder="Send Message"
            onChange={getInputMesageHandler}
            onKeyDown={getKeyHandler}
          />
          <button className="send_msg_btn" onClick={onClickHandler}>
            <SendIcon style={{ color: "#fff" }} />
          </button>
        </Box>
      </div>
    </div>
  );
}
