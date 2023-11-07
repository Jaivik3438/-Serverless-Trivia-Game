import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../../assets/sass/CreateTriviaGames.css'; // Import the CSS file for additional styling

function GameForm() {
  const [gameData, setgameData] = useState({
    id: '',
    gameName: '',
    category: '',
    createdBy: '',
    description: '',
    difficultyLevel: '',
    participants: 0,
    startTime: '',
    timeAllowedPerQuestion: '',
    timeFrame: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedQuizData = { ...gameData, id: uuidv4(),questions:[] };
    
    console.log(JSON.stringify(updatedQuizData));
    try {
      const response = await fetch('https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/default/getTriviaGames2?TableName=trivia-games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuizData)
      });
      console.log(response);
      if (response.ok) {
        console.log('game created successfully');
        // Reset the form after successful submission
        setgameData({
          id: '',
          gameName: '',
          category: '',
          createdBy: '',
          description: '',
          difficultyLevel: '',
          participants: 0,
          startTime: '',
          timeAllowedPerQuestion: '',
          timeFrame: ''
        });
      } else {
        console.error('Error creating game:', response.status);
      }
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setgameData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="game-form-container">
          <div className="form-container">
      <h1>Create game</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          id="gameName"
          name="gameName"
          value={gameData.gameName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Category"
          id="category"
          name="category"
          value={gameData.category}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          id="description"
          name="description"
          value={gameData.description}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="difficultyLevel-label">Difficulty Level</InputLabel>
          <Select
            labelId="difficultyLevel-label"
            id="difficultyLevel"
            name="difficultyLevel"
            value={gameData.difficultyLevel}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Difficulty</MenuItem>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
            <MenuItem value="Legendary">Legendary</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Participants"
          id="participants"
          name="participants"
          value={gameData.participants}
          onChange={handleChange}
          required
        />
        <TextField
          type="datetime-local"
          label="Start Time"
          id="startTime"
          name="startTime"
          value={gameData.startTime}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Time Allowed Per Question (Seconds)"
          id="timeAllowedPerQuestion"
          name="timeAllowedPerQuestion"
          value={gameData.timeAllowedPerQuestion}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Time Frame (Minutes)"
          id="timeFrame"
          name="timeFrame"
          value={gameData.timeFrame}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create game
        </Button>
      </form>
      </div>
    </div>
  );
}

export default GameForm;
