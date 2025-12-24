import React, { useState } from 'react';
import './App.css';
import Wheel from './components/Wheel';

function App() {
  const [namesInput, setNamesInput] = useState('');
  const [names, setNames] = useState([]);
  const [winner, setWinner] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const handleNamesChange = (e) => {
    const input = e.target.value;
    setNamesInput(input);
    const nameList = input.split('\n').filter(name => name.trim() !== '');
    setNames(nameList);
    setWinner(null);
  };

  const handleSpin = async () => {
    if (names.length === 0) {
      alert('Please enter at least one name');
      return;
    }

    setSpinning(true);
    setWinner(null);

    try {
      const response = await fetch('http://localhost:8080/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: names.length }),
      });

      if (!response.ok) {
        throw new Error('Failed to get random number');
      }

      const data = await response.json();
      
      // Simulate spinning animation
      setTimeout(() => {
        setWinner(data.result - 1); // Convert to 0-based index
        setSpinning(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to backend. Make sure the server is running.');
      setSpinning(false);
    }
  };

  return (
    <div className="App">
      <h1>Random Name Picker Wheel</h1>
      <div className="container">
        <div className="column input-column">
          <h2>Enter Names</h2>
          <p className="instruction">One name per line</p>
          <textarea
            value={namesInput}
            onChange={handleNamesChange}
            placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana&#10;Eve"
            rows={15}
          />
          <div className="info">
            {names.length > 0 && <p>{names.length} name(s) entered</p>}
          </div>
        </div>

        <div className="column wheel-column">
          <h2>Spin the Wheel!</h2>
          <Wheel names={names} winner={winner} spinning={spinning} />
          <button 
            onClick={handleSpin} 
            disabled={spinning || names.length === 0}
            className="spin-button"
          >
            {spinning ? 'Spinning...' : 'SPIN'}
          </button>
          {winner !== null && !spinning && (
            <div className="winner-announcement">
              🎉 Winner: <strong>{names[winner]}</strong> 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

