import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
    hint: '',
    difficultyLevel: '',
    category: '',
    tag:''
  });

  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [editQuestion, setEditQuestion] = useState({});

  const handleOpenEditQuestion = (question) => {
    setEditQuestion(question);
    setOpenEditQuestion(true);
  };

  const handleCloseEditQuestion = () => {
    setOpenEditQuestion(false);
    setEditQuestion({});
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace this with your edit/update logic to update the question with the new data
      // For example, you can send a PUT request to update the question in your API
      const response2= await fetch('https://512hr78xq4.execute-api.us-east-1.amazonaws.com/Default/questionslist?TableName=questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({TableName : 'questions',Item :editQuestion})
      });
      console.log(response2)
      console.log("Edited question:", editQuestion);

      // Fetch the updated list of questions
      fetchQuestions();

      // Close the dialog
      handleCloseEditQuestion();
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch questions from the API
  useEffect(() => {
    fetchQuestions();
  }, []);


  const fetchQuestions = async () => {
    // Replace with your API endpoint for fetching questions
    const response = await fetch('https://512hr78xq4.execute-api.us-east-1.amazonaws.com/Default/questionslist?TableName=questions');
    const data = await response.json();
    setQuestions(data.Items);
  };

  const handleOpenAddQuestion = () => {
    setOpenAddQuestion(true);
  };

  const handleCloseAddQuestion = () => {
    setOpenAddQuestion(false);
    setNewQuestion({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: '',
      hint: '',
      difficultyLevel: '',
      category: '',
      tag:''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuestionWithId = {
      ...newQuestion,
      id: uuidv4()
    };


    try{
    const response = await axios.post('https://us-central1-jaivik-sda11project.cloudfunctions.net/applicationQuestionTag/processQuestions', {question : newQuestionWithId.question}); 
    console.log(response);
    const newQuestionWithTag = {
      ...newQuestionWithId,
      tag: response.data.tags
    }

  
    const response2= await fetch('https://512hr78xq4.execute-api.us-east-1.amazonaws.com/Default/questionslist?TableName=questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({TableName : 'questions',Item :newQuestionWithTag})
    });



    // Fetch the updated list of questions
    fetchQuestions();

    // Close the dialog
    handleCloseAddQuestion();
  }catch (err){
    console.log(err);
  }
  };

  const handleDeleteQuestion = async (questionId) => {
    console.log(questionId)
    // Send a request to delete the question with the specified ID

   const response= await fetch(`https://512hr78xq4.execute-api.us-east-1.amazonaws.com/Default/questionslist?TableName=questions&id=`+questionId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    // Fetch the updated list of questions
    fetchQuestions();
  };

  return (
    <div>
      <h1>Question List</h1>
      <Button variant="contained" onClick={handleOpenAddQuestion}>
        Add Question
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Option A</TableCell>
              <TableCell>Option B</TableCell>
              <TableCell>Option C</TableCell>
              <TableCell>Option D</TableCell>
              <TableCell>Correct Option</TableCell>
              <TableCell>Hint</TableCell>
              <TableCell>Difficulty Level</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.id}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.optionA}</TableCell>
                <TableCell>{question.optionB}</TableCell>
                <TableCell>{question.optionC}</TableCell>
                <TableCell>{question.optionD}</TableCell>
                <TableCell>{question.correctOption}</TableCell>
                <TableCell>{question.hint}</TableCell>
                <TableCell>{question.difficultyLevel}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>{question.tag}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(question.id)}>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenEditQuestion(question)}
                  >
                    Edit
                  </Button>
                </TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Question Dialog */}
      <Dialog open={openAddQuestion} onClose={handleCloseAddQuestion}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the details for the new question:</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Question"
              name="question"
              value={newQuestion.question}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option A"
              name="optionA"
              value={newQuestion.optionA}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option B"
              name="optionB"
              value={newQuestion.optionB}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option C"
              name="optionC"
              value={newQuestion.optionC}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option D"
              name="optionD"
              value={newQuestion.optionD}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Correct Option"
              name="correctOption"
              value={newQuestion.correctOption}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Hint"
              name="hint"
              value={newQuestion.hint}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                name="difficultyLevel"
                value={newQuestion.difficultyLevel}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Select Difficulty Level</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Category"
              name="category"
              value={newQuestion.category}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleCloseAddQuestion}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openEditQuestion} onClose={handleCloseEditQuestion}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <DialogContentText>Please edit the question details:</DialogContentText>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Question"
              name="question"
              value={editQuestion.question}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option A"
              name="optionA"
              value={editQuestion.optionA}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option B"
              name="optionB"
              value={editQuestion.optionB}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option C"
              name="optionC"
              value={editQuestion.optionC}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option D"
              name="optionD"
              value={editQuestion.optionD}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Correct Option"
              name="correctOption"
              value={editQuestion.correctOption}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Hint"
              name="hint"
              value={editQuestion.hint}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                name="difficultyLevel"
                value={editQuestion.difficultyLevel}
                onChange={handleEditChange}
                required
              >
                <MenuItem value="">Select Difficulty Level</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Category"
              name="category"
              value={editQuestion.category}
              onChange={handleEditChange}
              fullWidth
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleCloseEditQuestion}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionList;
