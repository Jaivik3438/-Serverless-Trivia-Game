import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSearch, FaFilter } from "react-icons/fa";

import "../../assets/sass/GameList.css";
import CommonNavbar from "../CommonNavbar";

import { Button } from "@mui/material";
import axios from "axios";

const GameList = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");

  const filteredGames = games.filter((game) => {
    const matchSearchTerm = game.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "" || game.category === selectedCategory;
    const matchDifficulty =
      selectedDifficulty === "" || game.difficultyLevel === selectedDifficulty;
    const matchTimeFrame =
      selectedTimeFrame === "" || game.timeFrame === selectedTimeFrame;
    return (
      matchSearchTerm && matchCategory && matchDifficulty && matchTimeFrame
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleTimeFrameChange = (e) => {
    setSelectedTimeFrame(e.target.value);
  };

  const handleCreateTeam = () => {

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    axios
     .post("https://us-central1-prefab-pixel-391815.cloudfunctions.net/create_team", {name, email})
     .then((res) => 
      //console.log(res.data.data.team);
      localStorage.setItem("team", res.data.data.team))

     //console.log(res))
     .catch((err) => console.log(err));
    navigate("/team-invite");
  };

  const joinGame = (gameId) => {
    navigate("/Quiz2", { state: { gameId } });
  };

  useEffect(() => {
    // Fetch game data from API
    fetch(
      "https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games"
    )
      .then((response) => response.json())
      .then((data) => setGames(data.Items))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="game-list">
      <CommonNavbar />
      <h1 className="game-list-title">Trivia Game Lobby</h1>
      <div className="filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 400 }}
          onClick={handleCreateTeam}
        >
          Create Team
        </Button>

        <div className="filter-select-container">
          <FaFilter className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Sports">Sports</option>
            {/* Add more options for categories */}
          </select>
          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="filter-select"
          >
            <option value="">All Difficulty Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            {/* Add more options for difficulty levels */}
          </select>
          <select
            value={selectedTimeFrame}
            onChange={handleTimeFrameChange}
            className="filter-select"
          >
            <option value="">All Time Frames</option>
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            {/* Add more options for time frames */}
          </select>
        </div>
      </div>
      <div className="grid">
        {filteredGames.map((game) => (
          <div key={game.id} className="card">
            <img
              src="https://previews.123rf.com/images/olegback/olegback2010/olegback201000068/157631503-quiz-game-show-retro-background-vintage-trivia-night-poster-in-pub-marketing-design-vector.jpg"
              alt="Game"
              className="image"
            />
            <div className="card-details">
              <h3>{game.category}</h3>
              <p>{game.description}</p>
              <ul>
                <li>Start Time: {game.startTime}</li>
                <li>Participants: {game.participants}</li>
                <li>
                  Time Allowed Per Question: {game.timeAllowedPerQuestion}
                </li>
                <li>Time Frame: {game.timeFrame}</li>
                <li>Difficulty Level: {game.difficultyLevel}</li>
              </ul>
              <button
                className="card-button"
                onClick={() => {
                  joinGame(game.id);
                }}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
{
  /* <img src="https://previews.123rf.com/images/olegback/olegback2010/olegback201000068/157631503-quiz-game-show-retro-background-vintage-trivia-night-poster-in-pub-marketing-design-vector.jpg" alt="Game" className="image" /> */
}
