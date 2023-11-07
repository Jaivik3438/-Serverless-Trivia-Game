import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
const AdminHome =() => {
    const [isAdmin,setIsAdmin] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const email = localStorage.getItem("email");
      if(email==="fl700637@dal.ca"){
        setIsAdmin(true);
      }
    }
  }, []);

  return (
   <div>
        {isAdmin ? (
            <div>
            <h1>Welcome Admin</h1>
            <h2>Manage Trivia Content</h2>
            <Button variant="contained" href="/AdminGameList2">
          Create Trivia Games
        </Button>
        <div><h1></h1></div>
        <Button variant="contained" href="/QuestionsList">
          Manage Questions List
        </Button>
        </div>
        ):(
            <div>
            <h1>You are not a administrator.</h1>
            <h1>Contact Tech Support</h1>
            <Button variant="contained" href="/login">
          Back
        </Button>
        </div>
        )}
    </div>
  );

}
export default AdminHome;