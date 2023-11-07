
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({  origin: '*'}));
admin.initializeApp();
const firestore = admin.firestore();
// const sdk = LookerNodeSDK.init40();
// const { LookerNodeSDK } = require("@looker/sdk-node");




const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { event } = require("firebase-functions/v1/analytics");


// const UserProfile = require("./models/UserProfile");

// const bucket = admin.storage().bucket();

app.post("/createUser", async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const data = req.body;
    const imageBase64 = data.profileImage;

    console.log(imageBase64);

    const imageBuffer = Buffer.from(imageBase64, 'base64');
    // const file = bucket.file('profileImages/image.jpeg');
    // const options = {
    //   metadata: {
    //     contentType: 'image/jpeg'
    //   },
    //   public: true,
    //   predefinedAcl: 'publicRead'
    // };

    // await file.save(imageBuffer, options);


    // const signedUrlConfig = {
    //   action: 'read',
    //   expires: Date.now() + 60 * 60 * 1000 // Valid for 1 hour
    // };

    // const [url] = await file.getSignedUrl({
    //   action: 'read',
    //   expires: Date.now() + 60 * 60 * 1000 // Valid for 1 hour
    // });

    const imageUrl = imageBase64;

    // Fetch the user from Firestore by email
    const userSnapshot = await firestore.collection('users').where('email', '==', data.email).get();
    if (!userSnapshot.empty) {
      // User already exists, update the existing user
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;

      await userDoc.ref.update({
        name: data.name,
        phone: data.phone,
        city: data.city,
        province: data.province,
        profileImage: imageUrl,
        preference: data.preference,
        isAdmin:false
      });

      res.status(200).send(`User updated with ID: ${userId}`);
    } else {
      // User does not exist, create a new user
      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        province: data.province,
        profileImage: imageUrl,
        preference: data.preference,
        isAdmin: false
      };

      const newUserRef = await firestore.collection('users').add(newUser);
      res.status(201).send(`User created with ID: ${newUserRef.id}`);
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/getProfile', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Query Firestore for the user profile data based on the email
    const userSnapshot = await firestore.collection('users').where('email', '==', email).get();

    if (!userSnapshot.empty) {
      // Assuming the email is unique, there should be only one document
      const userData = userSnapshot.docs[0].data();
      res.status(200).json(userData);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server ErrorOO' });
  }
});


app.get('/teams', (req, res) => {
  const teamsRef = db.collection('Teams');

  teamsRef.get()
    .then((snapshot) => {
      const teams = [];
      snapshot.forEach((doc) => {
        const teamData = doc.data();
        teams.push({ id: doc.id, ...teamData });
      });
      res.json(teams);
    })
    .catch((error) => {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Unable to fetch teams' });
    });
});
// API to fetch all team data
app.get('/teams', (req, res) => {
  const teamsRef = firestore.collection('Teams');

  teamsRef.get()
    .then((snapshot) => {
      const teams = [];
      snapshot.forEach((doc) => {
        const teamData = doc.data();
        teams.push({ id: doc.id, ...teamData });
      });
      res.json(teams);
    })
    .catch((error) => {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Unable to fetch teams' });
    });
});

// API to fetch data for a specific player in a team
app.get('/teams/:teamName/players/:playerName', (req, res) => {
  const { teamName, playerName } = req.params;

  console.log(teamName);
  const teamRef = firestore.collection('Teams').doc(teamName);

  teamRef.get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Team not found' });
      }

      const teamData = doc.data();
      const playerData = teamData[playerName];

      if (!playerData) {
        return res.status(404).json({ error: 'Player not found in the team' });
      }

      res.json(playerData);
    })
    .catch((error) => {
      console.error('Error fetching player data:', error);
      res.status(500).json({ error: 'Unable to fetch player data' });
    });
});


app.get("/",(req, res) => {
  res.send("<h1>API work</h1>");
});

exports.api = onRequest(app);

// exports.getGameStatistics = onRequest(async (req, res) => {
//   try {

//     const triviaResponsesSnapshot = await firestore.collection('history').get();

//     let totalResponses = 0;
//     let correctAnswers = 0;
//     let incorrectAnswers = 0;
//     const questionFrequency = {};

//     triviaResponsesSnapshot.forEach(responseDoc => {
//       const responseData = responseDoc.data();
//       totalResponses++;

//       if (responseData.isCorrect) {
//         correctAnswers++;
//       } else {
//         incorrectAnswers++;
//       }

//       const questionId = responseData.questionId;
//       if (questionFrequency[questionId]) {
//         questionFrequency[questionId]++;
//       } else {
//         questionFrequency[questionId] = 1;
//       }
//     });

//     // Prepare the response object with the statistics
//     const statistics = {
//       totalResponses,
//       correctAnswers,
//       incorrectAnswers,
//       questionFrequency,
//     };

//     res.status(200).json(statistics);
//   } catch (error) {
//     console.error("Error fetching trivia game statistics:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// exports.looketInit() = onRequest(async (req, res)=>{
//   const userId = await sdk.ok(sdk.me("id"));
//   const accessToken = await sdk.login_user(userId.id);
//   const user = {
//     user_token: accessToken.value,
//     token_last_refreshed: Date.now(),
//   };
//   res.json({ ...user });
// });
