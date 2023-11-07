import React from "react";
import "../../assets/sass/style.css";
// import Navbar from "./Navbar";
import { useState } from "react";
// import { useFirebaseApp, FirebaseAppProvider } from 'reactfire'; // Assuming you're using reactfire package
// import firestore from "../../firestore";
import axios from "axios";
import {
  TextField,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Grid,
  Alert,
  Snackbar,
  Container,
} from "@mui/material";
import { useEffect } from "react";
import CommonNavbar from "../CommonNavbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ];

  const categories = [
    "Technology",
    "Art",
    "Sports",
    "Fashion",
    "Food",
    "Music",
    "Travel",
    "Health",
    "Education",
  ];

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    preference: [],
    // other profile data
  });

  localStorage.setItem("Admin", true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const email = localStorage.getItem("email");
      // const name = localStorage.getItem("name");

      try {
        const response = await axios.post(
          // "https://api-szzwa6levq-uc.a.run.app/getProfile",
          "https://us-central1-prefab-pixel-391815.cloudfunctions.net/api/getProfile",
          { email: email } // Send the email as a query parameter
        );
        if (response.data) {
          // if (response.data.profileImage) {
          //   response.data.profileImage = response.data.profileImage;
          // }
          // Update the profileData state with the fetched data
          response.data.email = localStorage.getItem("email");
          response.data.name = localStorage.getItem("name");

          setProfileData(response.data);
          console.log(response.data);
          console.log("running");
        }
      } catch (error) {
        setProfileData({
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          phone: "",
          city: "",
          province: "",
          preference: [],
        });

        console.error("Error fetching profile data:", error);
      }
    };

    // Fetch profile data only if the email is available
    // if (profileData.email) {
    fetchProfileData();
    // }
  }, []);

  console.log(profileData, "hello");

  const handleCategoryChange = (event) => {
    const selectedCategories = event.target.value;
    setProfileData((prevData) => ({
      ...prevData,
      preference: selectedCategories,
    }));
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     setProfileData((prevData) => ({
  //       ...prevData,
  //       profileImage: e.target.result
  //     }));
  //   };

  //   reader.readAsDataURL(file);
  // };

  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 2 MB (change this value to your desired limit)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      // Show an error message or handle the case as you prefer
      console.log("triggered");

      setSnackbarMessage("File size exceeds the limit (4 MB)");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      console.error("File size exceeds the limit");
      event.target.value = "";

      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: base64Image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation regular expressions
    const phonePattern = /^[0-9\s()-]*$/; // Only digits, spaces, hyphens, and parentheses are allowed
    const cityPattern = /^[A-Za-z\s]*$/; // Alphabets and spaces are allowed (including empty spaces)

    if (name === "phone") {
      const digitsOnly = value.replace(/[^\d]/g, ""); // Remove non-digit characters
      if (digitsOnly.length === 10) {
        const formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
          3,
          6
        )}-${digitsOnly.slice(6)}`;
        setProfileData((prevState) => ({
          ...prevState,
          [name]: formattedNumber,
        }));
        return;
      }
    }

    // Check the name of the field and apply the appropriate validation
    if (name === "phone" && !phonePattern.test(value)) {
      setSnackbarMessage("Phone number should only contain digits");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (name === "city" && !cityPattern.test(value)) {
      setSnackbarMessage("City should only contain alphabets");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://us-central1-prefab-pixel-391815.cloudfunctions.net/api/createUser",
        profileData
      );

      console.log(response);
      console.log("Profile updated successfully!", response.data);

      setSnackbarMessage("Profile updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update profile");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Failed to update profile:", error);
    }
  };

  const handleStatistics = () => {
    window.location.href =
      "https://lookerstudio.google.com/embed/reporting/1c50bfaf-841e-4e8e-9239-6021dc5d0ba1/page/tEnnC";
    navigate("/statistics");
  };

  const handleArchivements = () => {
    window.location.href =
      "https://lookerstudio.google.com/embed/reporting/a5bdf863-7f6f-4169-bc39-1829c42cd9da/page/tEnnC";
    navigate("/comparision");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <CommonNavbar />
      <br />
      <br />
      <br />
      <br />

      <div className="profile-buttons">
        <Container>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStatistics}
          >
            Statistics
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleArchivements}
          >
            Compare Achievements
          </Button>
        </Container>
      </div>
      {/* <div className="profile-container"> */}
      <div className="update-profile">
        <form onSubmit={(event) => updateProfile(event)} method="post">
          <Avatar
            className="center"
            src={profileData.profileImage}
            alt="Profile Image"
            sx={{ width: 150, height: 150 }}
          />
          <input
            key={profileData.profileImage}
            accept="image/*"
            id="profileImage"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="profileImage">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          <div className="sidebyside">
            <TextField
              label="Name"
              disabled
              name="name"
              value={profileData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ width: "300px", height: "50px" }}
            />
            <TextField
              disabled
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ width: "300px", height: "50px" }}
            />
          </div>

          <TextField
            label="Phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div className="sidebyside">
            <FormControl fullWidth margin="normal">
              <InputLabel>Province</InputLabel>
              <Select
                name="province"
                value={profileData.province}
                onChange={handleChange}
              >
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="City"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>

          <FormControl fullWidth margin="normal">
            <InputLabel>Preference</InputLabel>
            <Select
              name="preference"
              multiple
              value={profileData.preference}
              onChange={handleCategoryChange}
              renderValue={(selected) => (
                <Grid container spacing={1}>
                  {selected.map((category) => (
                    <Grid item key={category}>
                      <Chip label={category} />
                    </Grid>
                  ))}
                </Grid>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="center"
          >
            Update Profile
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

// function ProfileWrapper(){
//   return(
//     <FirebaseAppProvider firebaseApp={firestore} >
//       <Profile/>
//     </FirebaseAppProvider>
//   );
// }

export default Profile;
