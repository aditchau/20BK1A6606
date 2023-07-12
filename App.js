import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUrls(event.target.value.split('\n'));
  };

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('/api/numbers', { params: { url: urls } });
      setNumbers(response.data.numbers);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching the numbers.');
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <textarea
        placeholder="Enter URLs (one per line)"
        value={urls.join('\n')}
        onChange={handleInputChange}
      />
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {error && <p>{error}</p>}
      {numbers.length > 0 && (
        <div>
          <h2>Numbers:</h2>
          <ul>
            {numbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;