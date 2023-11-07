import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function CommonNavbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    // navigate("/Logout");
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="fixed" color="default" style={{ marginBottom: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/dashboard"
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
              gap: "10px",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {isLoggedIn ? (
              <>
                {/* Show other options */}
                <Button
                  // component={Link}
                  // to="/"
                  sx={{
                    color: "#1e69ba",
                    fontWeight: "bold",
                    marginRight: { xs: 0, sm: "10px" },
                    marginBottom: { xs: "10px", sm: 0 },
                  }}
                  href="/profile"
                >
                  User Profile Management
                </Button>
                <Button
                  // component={Link}
                  // to="/"
                  sx={{
                    color: "#1e69ba",
                    fontWeight: "bold",
                    marginRight: { xs: 0, sm: "10px" },
                    marginBottom: { xs: "10px", sm: 0 },
                  }}
                  href="/team-management"
                >
                  My Team
                </Button>
                <Button
                  // component={Link}
                  // to="/"
                  sx={{
                    color: "#1e69ba",
                    fontWeight: "bold",
                    marginRight: { xs: 0, sm: "10px" },
                    marginBottom: { xs: "10px", sm: 0 },
                  }}
                  href="/GameList"
                >
                  Trivia Lobby
                </Button>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: "#1e69ba",
                    fontWeight: "bold",
                    marginBottom: { xs: "10px", sm: 0 },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              // Show only the "Login" button
              <Button
                sx={{
                  color: "#1e69ba",
                  fontWeight: "bold",
                  marginRight: { xs: 0, sm: "10px" },
                  marginBottom: { xs: "10px", sm: 0 },
                }}
                // href="https://sda11serverlessproject.auth.us-east-1.amazoncognito.com/login?client_id=4is01usckduv6qbvrn76c6em3v&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Ffrontend-service-p4bza2qo7a-uc.a.run.app"
                href="https://sda11serverlessproject.auth.us-east-1.amazoncognito.com/login?client_id=4is01usckduv6qbvrn76c6em3v&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost:3000"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
        {/* <Login /> */}
      </Container>
    </AppBar>
  );
}

export default CommonNavbar;
