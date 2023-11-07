import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CommonNavbar from "../CommonNavbar";

function GameExperience() {
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
    startTime: "2023-07-13T17:46",
    timeAllowedPerQuestion: "1",
    timeFrame: "10",
  };

  const [currentQuestion, setCurrentQuestion] = useState(null);

  // useEffect(() => {
  // Parse the start time and calculate the current question index
  //   const startTime = new Date(Date.parse(gameDetails.startTime));
  //   const currentTime = new Date();
  //   const timeAllowedPerQuestion = parseInt(gameDetails.timeAllowedPerQuestion);

  //   const elapsedTimeInSeconds = Math.floor(
  //     currentTime.getMinutes() - startTime.getMinutes()
  //   );
  //   console.log("Time Diff" + elapsedTimeInSeconds);
  //   const currentQuestionIndex = Math.min(
  //     Math.floor(elapsedTimeInSeconds / timeAllowedPerQuestion),
  //     gameDetails.questions.length - 1
  //   );
  //   console.log("Current Index" + currentQuestionIndex);
  //   const current = gameDetails.questions[currentQuestionIndex];
  //   console.log(current.value);
  //   setCurrentQuestion(current);
  // }, []);

  // const startGame = () => {
  //   // Re-run the calculation logic when the button is clicked
  //   const startTime = new Date(Date.parse(gameDetails.startTime));
  //   const currentTime = new Date();
  //   const timeFrame = parseInt(gameDetails.timeFrame);
  //   const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  //   const currentQuestionIndex = Math.min(
  //     Math.floor(elapsedTimeInSeconds / 120),
  //     gameDetails.questions.length - 1
  //   );
  //   setCurrentQuestion(currentQuestionIndex);
  // };

  return (
    <div>
      <CommonNavbar />

      {/* {currentQuestion.value} */}
      {/* ):(  <p>Game Over!</p>)} */}
      {/* <Button onClick={startGame}>Start Game</Button>
      {currentQuestionIndex !== -1 && currentQuestionIndex < gameDetails.questions.length ? (
        <div>
          <h2>{gameDetails.questions[currentQuestionIndex].value}</h2>
          <p>Hint: {gameDetails.questions[currentQuestionIndex].hint}</p>
          <ul>
            {Object.entries(gameDetails.questions[currentQuestionIndex].options).map(([optionKey, optionValue]) => (
              <li key={optionKey}>
                {optionKey}: {optionValue}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Game Over!</p>
      )} */}
    </div>
  );
}

export default GameExperience;
