import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import "../../assets/sass/AdminGameList.css";
function AdminGameList() {
  const [games, setGames] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedGame, setUpdatedGame] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(
        "https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.Items);
        setGames(data.Items);
      } else {
        console.error("Failed to fetch games:", response.status);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleEdit = (game) => {
    setUpdatedGame({ ...game });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "https://ovn8or4pqj.execute-api.us-east-1.amazonaws.com/Test/getTriviaGames2?TableName=trivia-games",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGame),
        }
      );
      if (response.ok) {
        setEditMode(false);
        fetchGames();
      } else {
        console.error("Failed to update game:", response.status);
      }
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedGame((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateGame = () => {
    navigate("/GameForm");
  };

  return (
    <div className="game-body">
      <div className="game-list-container">
        <h1 className="title">Game List</h1>
        <Button variant="contained" onClick={handleCreateGame}>
          Create Game
        </Button>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Game Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Difficulty Level</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Time Allowed Per Question</TableCell>
                <TableCell>Time Frame</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.id}</TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="gameName"
                        value={updatedGame.gameName}
                        onChange={handleChange}
                      />
                    ) : (
                      game.gameName
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="category"
                        value={updatedGame.category}
                        onChange={handleChange}
                      />
                    ) : (
                      game.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="createdBy"
                        value={updatedGame.createdBy}
                        onChange={handleChange}
                      />
                    ) : (
                      game.createdBy
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="description"
                        value={updatedGame.description}
                        onChange={handleChange}
                      />
                    ) : (
                      game.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="difficultyLevel"
                        value={updatedGame.difficultyLevel}
                        onChange={handleChange}
                      />
                    ) : (
                      game.difficultyLevel
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="participants"
                        type="number"
                        value={updatedGame.participants}
                        onChange={handleChange}
                      />
                    ) : (
                      game.participants
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="startTime"
                        type="datetime-local"
                        value={updatedGame.startTime}
                        onChange={handleChange}
                      />
                    ) : (
                      game.startTime
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="timeAllowedPerQuestion"
                        type="number"
                        value={updatedGame.timeAllowedPerQuestion}
                        onChange={handleChange}
                      />
                    ) : (
                      game.timeAllowedPerQuestion
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <TextField
                        name="timeFrame"
                        type="number"
                        value={updatedGame.timeFrame}
                        onChange={handleChange}
                      />
                    ) : (
                      game.timeFrame
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode && game.id === updatedGame.id ? (
                      <Button variant="contained" onClick={handleUpdate}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(game)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default AdminGameList;
