// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Typography, Button } from "@mui/material";

// const gameDetails = {
//   id: "3",
//   category: "Science",
//   createdBy: "user_id_3",
//   description: "Test your knowledge of scientific discoveries!",
//   difficultyLevel: "Easy",
//   participants: 6,
//   questions: [
//     {
//       correctOption: "a",
//       hint: "He formulated the laws of motion.",
//       options: {
//         a: "Isaac Newton",
//         b: "Albert Einstein",
//         c: "Galileo Galilei",
//         d: "Nikola Tesla",
//       },
//       questionId: "49",
//       value: "Who discovered gravity?",
//     },
//     {
//       correctOption: "a",
//       hint: "It is a non-metallic element.",
//       options: {
//         a: "6",
//         b: "8",
//         c: "14",
//         d: "12",
//       },
//       questionId: "50",
//       value: "What is the atomic number of carbon?",
//     },
//     {
//       correctOption: "a",
//       hint: "It is a non-metallic element.",
//       options: {
//         a: "6",
//         b: "8",
//         c: "14",
//         d: "12",
//       },
//       questionId: "50",
//       value: "What is the atomic number of carbon?",
//     },
//     {
//       correctOption: "a",
//       hint: "It is a non-metallic element.",
//       options: {
//         a: "6",
//         b: "8",
//         c: "14",
//         d: "12",
//       },
//       questionId: "50",
//       value: "What is the atomic number of carbon?",
//     },
//     {
//       correctOption: "a",
//       hint: "It is a non-metallic element.",
//       options: {
//         a: "6",
//         b: "8",
//         c: "14",
//         d: "12",
//       },
//       questionId: "50",
//       value: "What is the atomic number of carbon?",
//     },
//     {
//       correctOption: "a",
//       hint: "It is a non-metallic element.",
//       options: {
//         a: "6",
//         b: "8",
//         c: "14",
//         d: "12",
//       },
//       questionId: "50",
//       value: "What is the atomic number of carbon?",
//     },
//   ],
//   startTime: "2023-08-02T10:15",
//   timeAllowedPerQuestion: 1,
//   timeFrame: "10",
// };

// const GamePage = () => {
//   let socket;
//   const [startTimeMessage, setStartTimeMessage] = useState("");
//   const [endTimeMessage, setEndTimeMessage] = useState("");
//   const [showStartButton, setShowStartButton] = useState(false);
//   const [webSocketURL, setWebSocketURL] = useState("");
//   const [gameStarted, setGameStarted] = useState(false);
//   const [question, setQuestion] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [timer, setTimer] = useState(5);
//   const [timerEnded, setTimerEnded] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleOptionChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedOption(selectedValue);
//     console.log(`Selected option: ${selectedValue}`);
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const email = localStorage.getItem("email");
//       setWebSocketURL(
//         "wss://8tcj2pzqo7.execute-api.us-east-1.amazonaws.com/production?name=" +
//           email +
//           "&team=team1"
//       );
//     }
//   }, []);

//   useEffect(() => {
//     const checkGameStatus = () => {
//       const currentTime = new Date();
//       const startTime = new Date(gameDetails.startTime);
//       const timeFrame = parseInt(gameDetails.timeFrame, 10);

//       if (currentTime < startTime) {
//         setStartTimeMessage("Game is not yet started");
//         setShowStartButton(false);
//         setEndTimeMessage("");
//         setGameStarted(false);
//       } else if (
//         currentTime > new Date(startTime.getTime() + timeFrame * 60000)
//       ) {
//         setEndTimeMessage("Game has ended");
//         setStartTimeMessage("");
//         setShowStartButton(false);
//         setGameStarted(false);
//       } else {
//         setEndTimeMessage("");
//         setStartTimeMessage("");
//         setShowStartButton(true);
//       }
//     }}, []);

//   // useEffect(() => {

//   //   const checkGameStatus = () => {
//   //     const currentTime = new Date();
//   //     const startTime = new Date(gameDetails.startTime);
//   //     const timeFrame = parseInt(gameDetails.timeFrame, 10);

//   //     if (currentTime < startTime) {
//   //       setStartTimeMessage('Game is not yet started');
//   //       setShowStartButton(false);
//   //       setEndTimeMessage('');
//   //       setGameStarted(false);
//   //     } else if (currentTime > new Date(startTime.getTime() + timeFrame * 60000)) {
//   //       setEndTimeMessage('Game has ended');
//   //       setStartTimeMessage('');
//   //       setShowStartButton(false);
//   //       setGameStarted(false);
//   //     } else {
//   //       setEndTimeMessage('');
//   //       setStartTimeMessage('');
//   //       setShowStartButton(true);
//   //     }
//   //   };

//   //   checkGameStatus(); // Initial check when the component mounts

//   //   // Check game status every 30 seconds
//   //   const intervalId = setInterval(checkGameStatus, 30000);

//   //   // Clean up the interval when the component unmounts
//   //   return () => clearInterval(intervalId);
//   // }, []);

//   useEffect(() => {
//     let interval;
//     if (gameStarted && !timerEnded) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 1) {
//             setTimerEnded(true);

//             clearInterval(interval);
//             console.log("Question timer ended");
//             // window.alert("Time's up! Please select an answer.");

//             setQuestion(gameDetails.questions[currentIndex + 1]);

//             if (socket === undefined) {
//               console.log("Socket" + socket);
//               setCurrentIndex((prev) => {
//                 return prev + 1;
//               });
//               setTimer(60);
//               // connectWebSocket();
//             }

//             return 0;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [gameStarted]);

//   const handleStartButtonClick = () => {
//     console.log("Button clicked");
//     connectWebSocket();
//   };

//   const connectWebSocket = () => {
//     socket = new WebSocket(webSocketURL);

//     socket.onopen = () => {
//       console.log("WebSocket connected");

//       // question ={
//       //   "correctOption": "a",
//       //   "hint": "He formulated the laws of motion.",
//       //   "options": {
//       //     "a": "Isaac Newton",
//       //     "b": "Albert Einstein",
//       //     "c": "Galileo Galilei",
//       //     "d": "Nikola Tesla"
//       //   },
//       //   "questionId": "49",
//       //   "value": "Who discovered gravity?"
//       // },

//       console.log(gameDetails.questions[currentIndex]);
//       sendMessage(gameDetails.questions[currentIndex]);
//       setGameStarted(true);
//       setTimer(10);
//     };

//     socket.onmessage = (event) => {
//       console.log("WebSocket message received:", event.data);
//       const response = JSON.parse(event.data);
//       console.log(response.options);
//       response.options = response.options;
//       setQuestion(response);
//       setLoading(false);
//     };

//     socket.onclose = (event) => {
//       console.log("WebSocket connection closed:", event.code, event.reason);
//     };
//   };

//   const formatTime = (timeString) => {
//     return new Date(timeString).toLocaleString();
//   };

//   const formatQuestionTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };
//   const sendMessage = (Question) => {
//     const message = {
//       action: "showQuestion",
//       question: gameDetails.questions[0],
//       team: "team1",
//     };

//     socket.send(JSON.stringify(message));
//   };

//   return (
//     <div>
//       {gameStarted ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <Card style={{ width: 800, maxWidth: 800, padding: 20 }}>
//             {!loading ? (
//               <CardContent>
//                 <div>
//                   <Typography variant="h6">
//                     Timer: {formatQuestionTime(timer)}{" "}
//                   </Typography>
//                 </div>
//                 <Typography variant="h6">{question.value}</Typography>
//                 <div>
//                   <Typography variant="body1">
//                     A: {question.options.a}
//                   </Typography>
//                   <input
//                     type="radio"
//                     value="a"
//                     checked={selectedOption === "a"}
//                     onChange={handleOptionChange}
//                   />

//                   <Typography variant="body1">
//                     B: {question.options.b}
//                   </Typography>
//                   <input
//                     type="radio"
//                     value="b"
//                     checked={selectedOption === "b"}
//                     onChange={handleOptionChange}
//                   />
//                   <label>
//                     <Typography variant="body1">
//                       C: {question.options.c}
//                     </Typography>
//                     <input
//                       type="radio"
//                       value="c"
//                       checked={selectedOption === "c"}
//                       onChange={handleOptionChange}
//                     />
//                   </label>
//                   <label>
//                     <Typography variant="body1">
//                       D: {question.options.d}
//                     </Typography>
//                     <input
//                       type="radio"
//                       value="d"
//                       checked={selectedOption === "d"}
//                       onChange={handleOptionChange}
//                     />
//                   </label>
//                 </div>
//               </CardContent>
//             ) : (
//               <div>Loading....</div>
//             )}
//           </Card>
//         </div>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <Card style={{ maxWidth: 400, padding: 20 }}>
//             <CardContent>
//               <Typography variant="h6">Game Details</Typography>
//               <Typography variant="body1">
//                 Category: {gameDetails.category}
//               </Typography>
//               <Typography variant="body1">
//                 Description: {gameDetails.description}
//               </Typography>
//               <Typography variant="body1">
//                 Difficulty Level: {gameDetails.difficultyLevel}
//               </Typography>
//               <Typography variant="body1">
//                 Start Time: {formatTime(gameDetails.startTime)}
//               </Typography>
//               <Typography variant="body1">
//                 Time Allowed Per Question: {gameDetails.timeAllowedPerQuestion}{" "}
//                 seconds
//               </Typography>
//               <Typography variant="body1">
//                 End Game Time:{" "}
//                 {formatTime(
//                   new Date(gameDetails.startTime).getTime() +
//                     parseInt(gameDetails.timeFrame, 10) * 60000
//                 )}
//               </Typography>

//               <h1>{startTimeMessage && <div>{startTimeMessage}</div>}</h1>
//               <h1>{endTimeMessage && <div>{endTimeMessage}</div>}</h1>
//               {showStartButton && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleStartButtonClick}
//                 >
//                   Start Game
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GamePage;
