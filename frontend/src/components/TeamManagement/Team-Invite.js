import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import CommonNavbar from "../CommonNavbar";

const InviteForm = () => {
  const [emails, setEmails] = useState([]);
  const [names, setNames] =useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewEmail(event.target.value);
   
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newEmail.trim() !== "") {
      setEmails([...emails, newEmail]);
      setNewEmail("");
    }
    if (newName.trim() !== ""){
      setNames([...names, newName]);
      setNewName("");
    }
  };

  const sendInvite = (name, email) => {
    // Replace 'your-api-endpoint' with your actual API endpoint
    const apiUrl = "https://us-central1-prefab-pixel-391815.cloudfunctions.net/invite_member";
    console.log(email);

    const team = localStorage.getItem("team");
    // Your API request payload should be an object containing the email address
    const payload = { name, email, team };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error sending invite:", error);
      });
  };

  const handleSendInvites = () => {
    for (let i = 0; i < emails.length; i++) {
      const name = names[i];
      const email = emails[i];
      sendInvite(name, email);
    }
  };
  

  return (
    <div>
      <CommonNavbar />
      <Container>
        <br />
        <br />
        <br />
        <h2>Invite People</h2>
        <form onSubmit={handleSubmit}>
        <div>
        {names.map((name, index) => (
              <div key={index}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  disabled
                />
              </div>
            ))}

             {emails.map((email, index) => (
              <div key={index}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  disabled
                />
              </div>
            ))}
          </div> 
          <div>
          <TextField
              label="New Name"
              variant="outlined"
              value={newName}
              onChange={handleNameChange}
              placeholder="Enter name"
            />
            <TextField
              label="New Email"
              variant="outlined"
              value={newEmail}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            <Button variant="contained" color="primary" type="submit">
              Add Member
            </Button>
          </div>
        </form>
        {emails.length > 0 && (
          <div>
            <h3>Send Invites</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendInvites} // Call the function to send the invites
            >
              Send Invite
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default InviteForm;
