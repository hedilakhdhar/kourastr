import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to store the match data
  const [match, setMatch] = useState(null);

  // API key from api-football
  const apiKey = 'XXXXXXXXX';

  // API URL to get the last fixture of PSG
  const apiUrl = 'https://v3.football.api-sports.io/fixtures?team=85&last=1';
  // Function to fetch data from API
  const fetchData = async () => {
    try {
      // Set the headers with the API key
      const headers = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': apiKey,
      };

      // Make the request with axios
      const response = await axios.get(apiUrl, { headers });
       //alert(response)
      // Get the first fixture from the response data
      const fixture = response.data.response[0];

      // Set the match state with the fixture data
     
      setMatch(fixture);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // Use useEffect hook to call the API on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>PSG last match</h1>
      {match ? (
        // Display the match data if available
        <div>
          <p>
            Date: {match.fixture.date}
          </p>
          <p>
            Status: {match.fixture.status.long}
          </p>
          <p>
            Venue: {match.fixture.venue.name}
          </p>
          <p>
            Home team: {match.teams.home.name}
          </p>
          <p>
            Away team: {match.teams.away.name}
          </p>
          <p>
            Score: {match.goals.home} - {match.goals.away}
          </p>
        </div>
      ) : (
        // Display a loading message if not available
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
