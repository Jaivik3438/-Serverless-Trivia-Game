import React, { useState } from 'react';
import Chatbot from './ChatBot';
import MessageIcon from '@mui/icons-material/Message';

function Chat() {


// To handle chatbot is open or closed!!
const [chatState,setChatState] = useState(false);

const handleChatState = () => {
  const element = document.getElementById('chatbot');
   
    if(chatState === true)
    {
      element.style.display = 'none';
      setChatState(false);
    }
    else if(chatState === false){
      element.style.display = 'block';
      setChatState(!chatState);
    }
};

const handleChatStateBox = (val) => {
  setChatState(val);
  handleChatState();
}

  // chatbot icon style
  const iconStyle={
    backgroundColor:'rgb(55 65 81)', //MUI button background color: #1976d2
    width:'70px',
    height:'70px',
    display:'flex',
    borderRadius: 50,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'.5%',
    position: 'fixed',  // Keep the icon fixed at the bottom right
    bottom: '20px',     // Adjust the distance from the bottom of the screen
    right: '20px',      // Adjust the distance from the right of the screen
    zIndex: 10,   
  }
  
  return (
    <div className="chat">
      <div>
        <div style={iconStyle}>
          <MessageIcon style={{color:'white'}} fontSize='large' onClick={handleChatState}/>
        </div>
        </div>
        <div style={{display:'none',marginBottom:'1%'}} id="chatbot">
          <Chatbot setChatOpen={handleChatStateBox}/>
      </div>      
    </div>
  );
}

export default Chat;

