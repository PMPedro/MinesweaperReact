import './App.css';
import Board from "../src/Components/Board"
import React, { useEffect, useState } from 'react';


function App() {

  const [difficulty, setDifficulty] = useState('easy');

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="App">
      <h1> Minesweaper</h1>
      <div>
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <Board difficulty={difficulty} />
    </div>
  );
}

export default App;
