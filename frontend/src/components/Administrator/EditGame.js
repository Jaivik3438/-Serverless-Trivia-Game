import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const EditGamePage = () => {
  const location = useLocation();
  const [gameData, setGameData] = useState({
    id: location.state.game.id,
    createdBy: location.state.game.createdBy,
    gameName: location.state.game.gameName,
    category:  location.state.game.category,
    description:  location.state.game.description,
    difficultyLevel:  location.state.game.difficultyLevel,
    participants:  location.state.game.participants,
    startTime:  location.state.game.startTime,
    timeAllowedPerQuestion:  location.state.game.timeAllowedPerQuestion,
    timeFrame:  location.state.game.timeFrame,
    questions: location.state.game.questions
  });
  // const gameData = ;
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [message,setMessage]=useState('');

  useEffect(() => {
    // Fetch questions data from API and set it in the state
    fetch('https://512hr78xq4.execute-api.us-east-1.amazonaws.com/Default/questionslist?TableName=questions')
      .then(response => response.json())
      .then(data => {
        const newQuestions = data.Items.filter(question => !gameData.questions.some(q => q.id === question.id));
        setQuestions(newQuestions);
        setFilteredQuestions(newQuestions);
      })
      .catch(error => console.log(error));
  }, []);

  const handleQuestionSelection = question => {
    gameData.questions.push(question);
    setGameData(gameData)
    console.log(gameData.questions);
    setFilteredQuestions(prevQuestions => prevQuestions.filter(q => q.id !== question.id));
  };

  const handleCategoryFilterChange = event => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    if (selectedCategory === '') {
      setFilteredQuestions(questions);
    } else {
      const filteredQuestionsByCategory = questions.filter(question => question.category === selectedCategory);
      setFilteredQuestions(filteredQuestionsByCategory);
    }
  };
  const handleRemoveQuestion = (index) => {
    // Create a copy of the questions array in gameData and remove the selected question
    const updatedQuestions = [...gameData.questions];
    updatedQuestions.splice(index, 1);
  
    // Update the gameData state with the updated questions array
    setGameData({ ...gameData, questions: updatedQuestions });
  };
  
  const handleDifficultyFilterChange = event => {
    const selectedDifficulty = event.target.value;
    setDifficultyFilter(selectedDifficulty);

    // Apply difficulty filter to the questions list
    if (selectedDifficulty === '') {
      setFilteredQuestions(questions);
    } else {
      const filteredQuestionsByDifficulty = questions.filter(
        question => question.difficultyLevel === selectedDifficulty
      );
      setFilteredQuestions(filteredQuestionsByDifficulty);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try{
     await fetch(`https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    })
    await fetch(`https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games&GameId=`+gameData.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(data => {
      setGameData(data.Items[0])
      window.alert('Data Updated');
      console.log(data);
    })


  }catch (err){
    console.log("errr");
    console.log(err.message);
  }
  };

  return (
    <div>
      <h1>Edit Game</h1>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Game Name"
              name="gameName"
              value={gameData.gameName}
              onChange={event => {
                const updatedGameData = { ...gameData, gameName: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={gameData.category}
              onChange={event => {
                const updatedGameData = { ...gameData, category: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              value={gameData.description}
              onChange={event => {
                const updatedGameData = { ...gameData, description: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="difficultyLevel-label">Difficulty Level</InputLabel>
              <Select
                labelId="difficultyLevel-label"
                id="difficultyLevel"
                name="difficultyLevel"
                value={gameData.difficultyLevel}
                onChange={event => {
                  const updatedGameData = { ...gameData, difficultyLevel: event.target.value };
                  setGameData(updatedGameData); 
                }}
                required
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Participants"
              name="participants"
              value={gameData.participants}
              onChange={event => {
                const updatedGameData = { ...gameData, participants: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="datetime-local"
              label="Start Time"
              name="startTime"
              value={gameData.startTime}
              onChange={event => {
                const updatedGameData = { ...gameData, startTime: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Time Allowed Per Question (Seconds)"
              name="timeAllowedPerQuestion"
              value={gameData.timeAllowedPerQuestion}
              onChange={event => {
                const updatedGameData = { ...gameData, timeAllowedPerQuestion: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Time Frame (Minutes)"
              name="timeFrame"
              value={gameData.timeFrame}
              onChange={event => {
                const updatedGameData = { ...gameData, timeFrame: event.target.value };
                setGameData(updatedGameData); 
              }}
              required
              fullWidth
            />
          </Grid>
          {/* Add other game fields here */}
        </Grid>

        <h2>Questions</h2>
        <div className="filter-container">
          <FormControl>
            <InputLabel id="category-filter-label">Category Filter</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="science"> Science</MenuItem>
              <MenuItem value="history">History</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              {/* Add category options */}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="difficulty-filter-label">Difficulty Filter</InputLabel>
            <Select
              labelId="difficulty-filter-label"
              value={difficultyFilter}
              onChange={handleDifficultyFilterChange}
              fullWidth
            >
              <MenuItem value="">All Difficulty Levels</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="questions">
  {gameData.questions.map((question, index) => (
    <div key={index} className="question-item">
      <span>{question.question}</span>
      <Button onClick={() => handleRemoveQuestion(index)}>Remove</Button>
    </div>
  ))}
</div>
        <div className="questions-list">
          {filteredQuestions.map(question => (
            <div key={question.id} className="question-item">
              <span>{question.question}</span>
              <Button onClick={() => handleQuestionSelection(question)}>Add</Button>
            </div>
          ))}
        </div>

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditGamePage;
