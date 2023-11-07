import React, { useEffect, useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

import '../../assets/sass/AdminGameList2.css';

const GameList2 = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('');

  const filteredGames = games.filter(game => {
    const matchSearchTerm = game.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === '' || game.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === '' || game.difficultyLevel === selectedDifficulty;
    const matchTimeFrame = selectedTimeFrame === '' || game.timeFrame === selectedTimeFrame;
    return matchSearchTerm && matchCategory && matchDifficulty && matchTimeFrame;
  });

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = e => {
    setSelectedDifficulty(e.target.value);
  };

  const handleTimeFrameChange = e => {
    setSelectedTimeFrame(e.target.value);
  };

  useEffect(() => {
    // Fetch game data from API
    fetch('https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games')
      .then(response => response.json())
      .then(data => setGames(data.Items))
      .catch(error => console.log(error));
  }, []);

  const handleEdit = (game) => {
    // Navigate to the Edit Game page and pass the game's data as state
    navigate('/editGame', { state: { game } });
  };

  const GridContainer = styled(Grid)({
    margin: '20px',
  });

  const CardButton = styled(Button)({
    marginTop: '10px',
  });

  return (
    <div className="game-list">
      <h1 className="game-list-title">Admin Trivia Game Lobby</h1>
      <div className="filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <TextField
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-select-container">
          <FaFilter className="filter-icon" />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              {/* Add more options for categories */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="difficulty-select-label">Difficulty Level</InputLabel>
            <Select
              labelId="difficulty-select-label"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <MenuItem value="">All Difficulty Levels</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
              {/* Add more options for difficulty levels */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              value={selectedTimeFrame}
              onChange={handleTimeFrameChange}>
              <MenuItem value="">All Time Frames</MenuItem>
              <MenuItem value="15 minutes">15 minutes</MenuItem>
              <MenuItem value="30 minutes">30 minutes</MenuItem>
              <MenuItem value="1 hour">1 hour</MenuItem>
              {/* Add more options for time frames */}
            </Select>
          </FormControl>
        </div>
      </div>
      <Button variant="contained" href="/GameForm">
          Create Game
        </Button>
      <GridContainer container spacing={2}>
        {filteredGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <img src="https://previews.123rf.com/images/olegback/olegback2010/olegback201000068/157631503-quiz-game-show-retro-background-vintage-trivia-night-poster-in-pub-marketing-design-vector.jpg" alt="Game" className="image" />
              <CardContent>
                <Typography variant="h6" component="h3">{game.category}</Typography>
                <Typography variant="body2" color="textSecondary">{game.description}</Typography>
                <ul>
                  <li>Start Time: {game.startTime}</li>
                  <li>Participants: {game.participants}</li>
                  <li>Time Allowed Per Question: {game.timeAllowedPerQuestion}</li>
                  <li>Time Frame: {game.timeFrame}</li>
                  <li>Difficulty Level: {game.difficultyLevel}</li>
                </ul>
                <CardButton variant="contained" onClick={() => handleEdit(game)}>Edit</CardButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </GridContainer>
    </div>
  );
};

export default GameList2;
