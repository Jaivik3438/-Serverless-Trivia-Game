import React, { useState, useEffect, useRef } from "react";
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

// const socket = io(
//   "wss://hzgt5rve8i.execute-api.us-east-1.amazonaws.com/brodcastOptions"
// );

const Quiz = () => {
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
    ],
    startTime: "2023-08-02T14:10",
    timeAllowedPerQuestion: 1,
    timeFrame: "10",
  };

  const quizData = gameDetails.questions.map((question) => {
    return {
      question: question.value,
      options: Object.values(question.options),
      correctAnswer: question.options[question.correctOption],
    };
  });

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Set the initial time in seconds here
  const [webSocketURL, setWebSocketURL] = useState("");
  const socketRef = useRef(null);
  let Admin = localStorage.getItem("Admin");
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    setTimeLeft(gameDetails.startTime);
    if (localStorage.getItem("token")) {
      const email = localStorage.getItem("email");
      if (Admin == "true") {
        setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
      console.log(email);

      setWebSocketURL(
        "wss://wkf5swulci.execute-api.us-east-1.amazonaws.com/production?name=" +
          email +
          "&team=team1&chat=team1"
      );
    }
  }, []);

  useEffect(() => {
    // Calculate the score when answers change
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  }, [answers, quizData]);

  // const startTime = new Date(gameDetails.startTime).getTime();
  const startTime = new Date(gameDetails.startTime).toISOString();

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

  useEffect(() => {
    // Calculate the remaining time and set it as the initial time for the countdown timer
    const currentTime = new Date().getTime();
    const timeDifference = startTime - currentTime;
    const remainingMinutes = Math.ceil(
      timeDifference / (1000 * 60 * gameDetails.timeFrame)
    );
    setTimeLeft(remainingMinutes);

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // const sendMessage = (questionIndex, optionIndex) => {
  //   const message = {
  //     action: "showQuestion",
  //     question: gameDetails.questions[questionIndex], //index
  //     team: "team1",
  //     index: questionIndex,
  //     optionIndex: optionIndex,
  //   };

  //   socketRef.current.send(JSON.stringify(message));
  // };

  const sendAnswers = (questionIndex, optionIndex) => {
    const message = {
      action: "showQuestion",
      question: gameDetails.questions[questionIndex], //index
      team: "team1",
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
    console.log("hello" + webSocketURL);
    socketRef.current = new WebSocket(webSocketURL);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");

      // sendMessage();

      // setGameStarted(true);

      // setTimer(10);
    };

    socketRef.current.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);

      const response = JSON.parse(event.data);

      // console.log(response.options);

      response.options = response.options;

      if (!Admin) {
        setAnswer(response);
      } else {
        console.log("This user is Admin");
      }

      // setLoading(false);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };
  };

  useEffect(() => {
    // Connect the WebSocket only if webSocketURL is not null or empty
    if (webSocketURL) {
      connectWebSocket();
    }
  }, [webSocketURL]);

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const selectedOption = event.target.value;
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });

    sendAnswers(questionIndex, optionIndex);

    // Emit selected option through socket
    // socketRef.current.emit("selectedOption", {
    //   questionIndex,
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
        <Card>
          <CardContent>
            <Typography variant="h5">Quiz</Typography>
            {quizData.map((question, index) => (
              <div key={index}>
                <Typography variant="h6">{question.question}</Typography>
                <FormControl component="fieldset" disabled={buttonStatus}>
                  <RadioGroup
                    value={answers[index] || ""}
                    // onChange={(event) =>
                    //   handleOptionChange(event, index, optionIndex)
                    // }
                  >
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                        onChange={(event) =>
                          handleOptionChange(event, index, optionIndex)
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <hr />
              </div>
            ))}
            <Typography variant="h6">
              Score: {score} / {quizData.length}
            </Typography>
            <Typography variant="h6">Time Left: </Typography>
            <Timer startTime={startTime} timeFrame={gameDetails.timeFrame} />
            {/* ... (your existing code) */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinishQuiz}
            >
              Finish Quiz
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Quiz;
