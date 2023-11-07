import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CommonNavbar from "../CommonNavbar";

const UserGoals = () => {
  // const [users, setUsers] = useState([]);
  // const currentUser = localStorage.getItem("current_user");

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("https://example.com/api/users"); // Replace with your actual API endpoint
  //       setUsers(response.data);

  //       // Move the current user to the top
  //       if (currentUser) {
  //         const currentUserIndex = response.data.findIndex(
  //           (user) => user.name === currentUser
  //         );
  //         if (currentUserIndex !== -1) {
  //           const [user] = response.data.splice(currentUserIndex, 1);
  //           setUsers([user, ...response.data]);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, [currentUser]);

  return (
    // <Container maxWidth="md">
    <div>
      <CommonNavbar />

      <iframe
        width="100%"
        height="950"
        src="https://lookerstudio.google.com/embed/reporting/a5bdf863-7f6f-4169-bc39-1829c42cd9da/page/tEnnC"
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default UserGoals;
