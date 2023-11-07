import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import io from "socket.io-client"; // Import the socket.io client library
import axios from "axios";
import Timer from "./Timer";
import CommonNavbar from "../CommonNavbar";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

// const socket = io(
//   "wss://hzgt5rve8i.execute-api.us-east-1.amazonaws.com/brodcastOptions"
// );
const gameDetails = {
  id: "3",
  category: "Science",
  createdBy: "user_id_3",
  description: "Test your knowledge of scientific discoveries!",
  difficultyLevel: "Easy",
  participants: 6,

  questions: [
    {
      correctOption: "a",
      hint: "He formulated the laws of motion.",
      options: {
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileo Galilei",
        d: "Nikola Tesla",
      },
      questionId: "49",
      value: "Who discovered gravity?",
    },
    {
      correctOption: "a",
      hint: "It is a non-metallic element.",
      options: {
        a: "6",
        b: "8",
        c: "14",
        d: "12",
      },
      questionId: "50",
      value: "What is the atomic number of carbon?",
    },
    {
      correctOption: "c",
      hint: "This compound consists of two hydrogen atoms and one oxygen atom.",
      options: {
        a: "Wo",
        b: "W",
        c: "H2O",
        d: "H2",
      },
      questionId: "50",
      value: "What is the chemical symbol for water?",
    },
    {
      correctOption: "a",
      hint: "This essential biological process sustains life on Earth and produces oxygen.",
      options: {
        a: "Photosynthesis",
        b: "Respiration",
        c: "Fermentation",
        d: "Combustion",
      },
      questionId: "50",
      value:
        "What is the process by which green plants convert sunlight into energy?",
    },
    {
      value: "Which planet in our solar system is known as the 'Red Planet'?",
      options: {
        a: "Venus",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
      },
      hint: "This planet is often associated with potential signs of past or present life.",
      correctOption: "b",
      questionId: "50",
    },
    {
      value: "Which unit is used to measure electric current?",
      options: {
        a: "Volt",
        b: "Ohm",
        c: "Ampere",
        d: "Watt",
      },
      hint: "This unit is named after a French physicist and mathematician.",
      correctOption: "c",
      questionId: "50",
    },
    {
      value: "What is the smallest unit of matter?",
      options: {
        a: "Atom",
        b: "Molecule",
        c: "Cell",
        d: "Proton",
      },
      hint: "This unit retains the properties of an element and is composed of subatomic particles.",
      correctOption: "a",
      questionId: "50",
    },
    {
      value: "Which gas makes up the majority of Earth's atmosphere?",
      options: {
        a: "Oxygen",
        b: "Nitrogen",
        c: "Carbon Dioxide",
        d: "Hydrogen",
      },
      hint: "This gas is essential for supporting life and combustion.",
      correctOption: "b",
      questionId: "50",
    },
    {
      value: "What is the largest organ in the human body?",
      options: {
        a: "Liver",
        b: "Brain",
        c: "Skin",
        d: "Heart",
      },
      hint: "This organ acts as a protective barrier and plays a role in temperature regulation.",
      correctOption: "c",
      questionId: "50",
    },
  ],
  startTime: "2023-08-05T14:09:00",
  timeAllowedPerQuestion: 1,
  timeFrame: "7",
};
const Quiz2 = () => {
  const navigate = useNavigate();

  const quizData = gameDetails.questions.map((question) => {
    return {
      question: question.value,
      options: Object.values(question.options),
      correctAnswer: question.options[question.correctOption],
    };
  });

  const [leaderboard, setLeaderboard] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Set the initial time in seconds here
  const [webSocketURL, setWebSocketURL] = useState("");
  const socketRef = useRef(null);
  let Admin = localStorage.getItem("Admin");
  const [buttonStatus, setButtonStatus] = useState(true);
  const [startTimeMessage, setStartTimeMessage] = useState("");
  const [endTimeMessage, setEndTimeMessage] = useState("");
  const [showStartButton, setShowStartButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(60);
  const [timerEnded, setTimerEnded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const location = useLocation();
  // const gameID = location.state.gameId;
  // const [gameDetails1, setGameDetails1] = useState("");
  // const [responseRecieved, setReponseRecieved] = useState(false);

  let option = "";

  // useEffect (()=>{

  //   if( responseRecieved){
  //     console.log(gameID)
  //      fetch(`https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games&GameId=`+gameID, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }).then(response => response.json())
  //     .then(data => {
  //       setReponseRecieved(true);
  //       setGameDetails1(data.Items[0])
  //     })
  //   }else{

  //   }
  // })
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const email = localStorage.getItem("email");
      setWebSocketURL(
        "wss://pl3bay7699.execute-api.us-east-1.amazonaws.com/production?name=" +
          email +
          "&team=chatteam1"
      );
    }
  }, []);

  //Game Status Code.
  useEffect(() => {
    if (gameDetails != "" && gameDetails != undefined) checkGameStatus(); // Initial check when the component mounts

    // Check game status every 30 seconds
    const intervalId = setInterval(checkGameStatus, 100000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const checkGameStatus = () => {
    const currentTime = new Date();
    const startTime = new Date(gameDetails.startTime);
    const timeFrame = parseInt(gameDetails.timeFrame, 10);

    if (currentTime < startTime) {
      setStartTimeMessage("Game is not yet started");
      setShowStartButton(false);
      setEndTimeMessage("");
      setGameStarted(false);
    } else if (
      currentTime > new Date(startTime.getTime() + timeFrame * 60000)
    ) {
      setEndTimeMessage("Game has ended");
      setStartTimeMessage("");
      setShowStartButton(false);
      setGameStarted(false);
      setLeaderboard(true);
    } else {
      setEndTimeMessage("");
      setStartTimeMessage("");
      setShowStartButton(true);
      localStorage.setItem("score", 0);
    }
  };
  useEffect(() => {
    let interval;
    if (gameStarted && !timerEnded) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 60) {
            setShowAnswer(false);
          }
          if (prevTimer <= 1) {
            setTimerEnded(true);
            console.log("Question timer ended" + selectedOption);
            updateScore();
            // clearInterval(interval);

            caluclateTimeAndQuestion();
            // window.alert("Time's up! Please select an answer.");
            // const newIndex = currentIndex +1;
            // setCurrentIndex(newIndex);
            // console.log(currentIndex);
            // setQuestion(gameDetails.questions[currentIndex]);

            // if (socket === undefined) {
            //   console.log("Socket" + socket);
            //   setCurrentIndex((prev) => {
            //     return prev + 1;
            //   });
            //   setTimer(60);
            // connectWebSocket();
            //}
            setShowAnswer(true);
            setTimerEnded(false);

            return 65;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  const updateScore = () => {
    console.log("updateScore");
    const correctOption = gameDetails.questions[currentIndex - 1].correctOption;
    console.log(correctOption);
    const storageOption = localStorage.getItem("selectedOption");
    console.log("Storage option" + storageOption);
    console.log("Score " + score);
    if (correctOption == storageOption) {
      const newScore = parseInt(localStorage.getItem("score")) + 1;
      console.log("NewScore" + newScore);
      localStorage.setItem("score", newScore);
      setScore(newScore);
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString();
  };

  const formatQuestionTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const sendAnswers = (questionIndex, optionIndex) => {
    const message = {
      action: "showQuestion",
      question: gameDetails.questions[questionIndex], //index
      team: "chatteam1",
      index: questionIndex,
      optionIndex: optionIndex,
    };
    console.log("sent");

    socketRef.current.send(JSON.stringify(message));
  };

  const setAnswer = () => {
    alert("hello,");
  };

  const connectWebSocket = () => {
    socketRef.current = new WebSocket(webSocketURL);
    console.log(webSocketURL);
    socketRef.current.onopen = () => {
      console.log("WebSocket connected");

      // sendMessage();

      // setGameStarted(true);

      // setTimer(10);
    };

    socketRef.current.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const response = JSON.parse(event.data);
      console.log(response);
      option = response.optionIndex;
      localStorage.setItem("selectedOption", response.optionIndex);
      setSelectedOption(response.optionIndex);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };
  };
  useEffect(() => {
    let Admin = localStorage.getItem("Admin");
    if (Admin == "true") {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  }, []);

  useEffect(() => {
    // Connect the WebSocket only if webSocketURL is not null or empty
    if (webSocketURL) {
      connectWebSocket();
    }
  }, [webSocketURL]);

  const caluclateTimeAndQuestion = () => {
    const startTime = new Date(Date.parse(gameDetails.startTime));
    const currentTime = new Date();
    const timeAllowedPerQuestion = parseInt(gameDetails.timeAllowedPerQuestion);

    const elapsedTimeInSeconds = Math.floor(
      currentTime.getMinutes() - startTime.getMinutes()
    );
    const currentQuestionIndex = Math.min(
      Math.floor(elapsedTimeInSeconds / timeAllowedPerQuestion),
      gameDetails.questions.length - 1
    );

    const current = gameDetails.questions[currentQuestionIndex];
    setCurrentIndex(currentQuestionIndex);
    setQuestion(current);
    calculateQuestionTimer();
    setLoading(false);
    // setCurrentQuestion(current);
  };

  const calculateQuestionTimer = () => {
    const startTime = new Date(Date.parse(gameDetails.startTime));
    const joinTime = new Date();
    const timeAllowedPerQuestion = parseInt(gameDetails.timeAllowedPerQuestion);
    const elapsedTimeInSeconds = new Date(joinTime - startTime);
    const timeDifferenceInMilliseconds = joinTime - startTime;
    const timeDifferenceInSeconds = Math.floor(
      timeDifferenceInMilliseconds / 1000
    );
    const seconds = timeDifferenceInSeconds % 60;
    const diffTime = Math.abs(seconds - 60);
    setTimer(diffTime);
  };

  const handleStartButtonClick = () => {
    console.log("Button clicked");
    // connectWebSocket();
    setGameStarted(true);
    caluclateTimeAndQuestion();
  };

  const handleOptionChange = (selectedOption1) => {
    // const selectedOption = event.target.value;
    console.log("Handle Option Change");
    option = selectedOption1;
    // console.log(option);
    localStorage.setItem("selectedOption", selectedOption1);
    // updateScore(selectedOption1);
    // setOption(selectedOption1);

    // setAnswers({
    //   ...answers,
    //   [currentIndex]: selectedOption1,
    // });
    // console.log("Handle Option Change")
    sendAnswers(0, selectedOption1);

    // Emit selected option through socket
    // socketRef.current.emit("selectedOption", {
    //   currentIndex,
    //   selectedOption,
    // });
  };

  // useEffect(() => {
  //   // Listen for incoming selectedOption events from other clients
  //   socketRef.current.on(
  //     "selectedOption",
  //     ({ questionIndex, selectedOption }) => {
  //       setAnswers((prevAnswers) => ({
  //         ...prevAnswers,
  //         [questionIndex]: selectedOption,
  //       }));
  //     }
  //   );
  // }, []);

  const handleEndtButtonClick = () => {
    const teamName = localStorage.getItem("team");
    axios
      .post(
        "https://us-central1-prefab-pixel-391815.cloudfunctions.net/update_team_score",
        { score: 10, team: "Team1" }
      )
      .then((res) => {
        console.log("Score stored successfully");
        console.log(res);
      });
    console.log("Final Score:", score);
    axios
      .post(
        "https://4ck6liq6w8.execute-api.us-east-1.amazonaws.com/dev/sendemail",
        { teamName: teamName }
      )
      .then((res) => {
        console.log("Score stored successfully");
        console.log(res);
      });
    navigate("/leaderboard");
  };

  const handleFinishQuiz = () => {
    // You can do something here with the final score
    axios
      .post(
        "https://us-central1-prefab-pixel-391815.cloudfunctions.net/update_team_score",
        { score: score, team: "Team1" }
      )
      .then((res) => {
        console.log("Score stored successfully");
        console.log(res);
      });
    console.log("Final Score:", score);
  };

  return (
    <div>
      <CommonNavbar />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Quiz App</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 8 }}>
        {showAnswer ? (
          <div>
            <h1> Correct Answer:</h1>
            <h1>{gameDetails.questions[currentIndex - 1].correctOption}</h1>
          </div>
        ) : (
          <div>
            {gameStarted ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Card style={{ width: 800, maxWidth: 800, padding: 20 }}>
                  {!loading ? (
                    <CardContent>
                      <div>
                        <Typography variant="h6">
                          Score : {localStorage.getItem("score")}
                        </Typography>
                        <Typography variant="h6">
                          Timer: {formatQuestionTime(timer)}{" "}
                        </Typography>
                      </div>
                      <Typography variant="h6">{question.value}</Typography>
                      <div>
                        <Typography variant="body1">
                          A: {question.options.a}
                        </Typography>
                        <input
                          type="radio"
                          value="a"
                          checked={selectedOption === "a"}
                          disabled={buttonStatus}
                          onChange={() => {
                            handleOptionChange("a");
                          }}
                        />

                        <Typography variant="body1">
                          B: {question.options.b}
                        </Typography>
                        <input
                          type="radio"
                          value="b"
                          checked={selectedOption === "b"}
                          disabled={buttonStatus}
                          onChange={() => {
                            handleOptionChange("b");
                          }}
                        />
                        <label>
                          <Typography variant="body1">
                            C: {question.options.c}
                          </Typography>
                          <input
                            type="radio"
                            value="c"
                            checked={selectedOption === "c"}
                            disabled={buttonStatus}
                            onChange={() => {
                              handleOptionChange("c");
                            }}
                          />
                        </label>
                        <label>
                          <Typography variant="body1">
                            D: {question.options.d}
                          </Typography>
                          <input
                            type="radio"
                            value="d"
                            checked={selectedOption === "d"}
                            disabled={buttonStatus}
                            onChange={() => {
                              handleOptionChange("d");
                            }}
                          />
                        </label>
                      </div>
                    </CardContent>
                  ) : (
                    <div>Loading....</div>
                  )}
                </Card>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Card style={{ maxWidth: 400, padding: 20 }}>
                  <CardContent>
                    <Typography variant="h6">Game Details</Typography>
                    <Typography variant="body1">
                      Category: {gameDetails.category}
                    </Typography>
                    <Typography variant="body1">
                      Description: {gameDetails.description}
                    </Typography>
                    <Typography variant="body1">
                      Difficulty Level: {gameDetails.difficultyLevel}
                    </Typography>
                    <Typography variant="body1">
                      Start Time: {formatTime(gameDetails.startTime)}
                    </Typography>
                    <Typography variant="body1">
                      Time Allowed Per Question:{" "}
                      {gameDetails.timeAllowedPerQuestion} seconds
                    </Typography>
                    <Typography variant="body1">
                      End Game Time:{" "}
                      {formatTime(
                        new Date(gameDetails.startTime).getTime() +
                          parseInt(gameDetails.timeFrame, 10) * 60000
                      )}
                    </Typography>

                    <h1>{startTimeMessage && <div>{startTimeMessage}</div>}</h1>
                    <h1>{endTimeMessage && <div>{endTimeMessage}</div>}</h1>
                    {showStartButton && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStartButtonClick}
                      >
                        Start Game
                      </Button>
                    )}
                    {leaderboard && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEndtButtonClick}
                      >
                        Go to Leaderboard
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Quiz2;
