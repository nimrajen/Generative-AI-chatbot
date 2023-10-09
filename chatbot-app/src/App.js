import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Grid, TextField} from "@mui/material";
import Message from "./components/Messages";

function App() {

const messagesListRef = React.createRef();
const [messageInput, setMessageInput] = useState("");
const [messages, setMessages] = useState([]);

useEffect(() => {
 
  setMessages([
    ...messages,
    {
      content: "Ask your question",
      isCustomer: false,
    }
  ]);
}, []);


const sendMessage = (question) => {

  setMessages([
    ...messages,
    {
      content: question,
      isCustomer: true,
    }
  ]);

  const formData = new FormData()
  if (question) {
    formData.append('question', question)
  }

  fetch('http://127.0.0.1:5000/predict', {
    method: "POST",
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {

      setMessages(prevState => [
        ...prevState,
        {
          content: data.result,
          isCustomer: false,
        }
      ]);
    })
    .catch((error) => {
    console.error("Error", error)
  })
}

const handleSubmit = (event) => {
  event.preventDefault();

  sendMessage(messageInput);
  setMessageInput("");
}

useEffect(() => {
  messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
}, [messagesListRef, messages]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{maxWidth: 400}}>
        <CardContent>
          <Box
            ref={messagesListRef}
            sx={{
              height: 420,
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            <Box sx={{m: 1, mr: 2}}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.content}
                  isCustomer={message.isCustomer}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexFlow: "row",
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default App;
