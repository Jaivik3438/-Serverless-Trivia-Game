import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { LexRuntimeV2 } from "aws-sdk";

const ChatBot = ({ setChatOpen }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Initialize Lex Runtime V2
  const lexClient = new LexRuntimeV2({
    region: "us-east-1",
    aws_access_key_id: "ASIAYTTALVN3FDX4YD4C",
    aws_secret_access_key: "IL6QQ8Ll5J/ez+n8dRiWwDtk7LUfO/3SnQI+bbQC",
    aws_session_token:
      "FwoGZXIvYXdzEK7//////////wEaDL+hi4S6KSvQfG1/fSLAARiQIOB+vlqv2cJRpTKJeshsbHCg9tDaSHSwtpyOUU1smB5j6uHHf9WADBchichiIdjIUGNhy7GXkhR+jrUMXScbmy7HeYqHEqjhobXR8Cv6qnQveY9btrGjHcceQkCpJ+EM1fnxN3iBuZUu8S4WDBFgpCFyl5n1l7IPqdf93XoREP10JKP4WaxKfaW3dLgTMgoYKZviCRNIcjpk52PBqtFkXuEBuVmBwGALKXN9Dv62ArsbA6aRQclFBSjgSSepdSii9rimBjItY8ZnK0jYoA2ZpKbC+nMaebIbn9EbY6It/oSVJik00pRdgsAkWh9awTDjdF5J",
  });

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: userInput, sender: "user" },
      ]);

      sendToLex(userInput);
      setUserInput("");
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatOpen(false);
  };

  const chatContainerRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const mainStyle = {
    maxWidth: 500,
    width: 400,
    margin: "0 auto",
    marginTop: "5px",
    border: `2px solid rgb(55 65 81)`,
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 11,
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    width: "98.01%",
    color: "white",
    padding: "1%",
    height: "45px",
    backgroundColor: "rgb(55 65 81)",
    zIndex: 11,
  };

  const chatButton = {
    backgroundColor: "rgb(55 65 81)",
    color: "white",
  };

  const paperStyle = {
    maxWidth: "100%",
    margin: "0 auto",
    padding: 16,
  };

  const scrollStyle = {
    maxHeight: 200,
    height: 200,
    overflowY: "auto",
  };

  const sendToLex = async (message) => {
    try {
      const lexParams = {
        botId: "EVZSPIVLE0",
        botAliasId: "TSTALIASID",
        localeId: "en_US",
        sessionId:
          "FwoGZXIvYXdzEK7//////////wEaDL+hi4S6KSvQfG1/fSLAARiQIOB+vlqv2cJRpTKJeshsbHCg9tDaSHSwtpyOUU1smB5j6uHHf9WADBchichiIdjIUGNhy7GXkhR+jrUMXScbmy7HeYqHEqjhobXR8Cv6qnQveY9btrGjHcceQkCpJ+EM1fnxN3iBuZUu8S4WDBFgpCFyl5n1l7IPqdf93XoREP10JKP4WaxKfaW3dLgTMgoYKZviCRNIcjpk52PBqtFkXuEBuVmBwGALKXN9Dv62ArsbA6aRQclFBSjgSSepdSii9rimBjItY8ZnK0jYoA2ZpKbC+nMaebIbn9EbY6It/oSVJik00pRdgsAkWh9awTDjdF5J", // Replace with a unique session ID for each user session
        text: message,
      };

      const data = await lexClient.recognizeText(lexParams).promise();

      if (data?.messages && data.messages.length > 0) {
        const botResponse =
          data.messages[0]?.content || "I am sorry, I did not understand that.";
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: botResponse, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message to Lex:", error);
    }
  };

  return (
    <div style={mainStyle}>
      <div style={navStyle}>
        Chatbot For You!
        <IconButton
          style={{ marginLeft: "auto", color: "white" }}
          onClick={handleCloseChat}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <Paper elevation={3} style={{ ...paperStyle, maxWidth: "100%" }}>
        <div style={{ ...scrollStyle, ...paperStyle }} ref={chatContainerRef}>
          <List>
            {chatHistory.map((message, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    align={message.sender === "user" ? "right" : "left"}
                    primary={message.text}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>
        <TextField
          label="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "rgb(55 65 81)" } }}
          margin="normal"
        />
        <Button
          style={chatButton}
          variant="contained"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Paper>
    </div>
  );
};

export default ChatBot;
