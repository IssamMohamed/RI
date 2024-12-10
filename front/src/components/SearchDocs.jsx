import React, { useState } from 'react';

function SearchDocs() {

  const style = {
    width: "100vw",
    height: "90vh", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2rem",
    alignItems: "center",
  };

  const inputStyle = {
    width: "600px",
    height: "40px",
    border: "1px solid #007BFF",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    fontFamily: "'Arial', sans-serif",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  // Styling for the result container and individual result items
  const resultsContainerStyle = {
    width: "90%",  
    marginTop: "20px", 
    textAlign: "left",
    height: "800px", // Fixed height
    overflowY: "auto", // Enables vertical scrolling
    border: "1px solid #ccc", // Optional: Adds a border around the container
    borderRadius: "8px", // Optional: Adds rounded corners
    padding: "10px",
    backgroundColor: "#f9f9f9", // Optional: Adds a background color
  };

  const resultItemStyle = {
    backgroundColor: "#fff",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const resultTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const resultContentStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  };

  const resultScoreStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#007BFF",
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data); // Assuming the response has the required structure
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={style}>
      <h1>SRI Search Documents</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        style={inputStyle}
      />
      <button onClick={fetchData}>Search</button>

      <div style={resultsContainerStyle}>
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} style={resultItemStyle}>
              <h3 style={resultTitleStyle}>{result.document.name}</h3>
              <p style={resultContentStyle}>{result.document.content}</p>
             <p style={resultScoreStyle}><strong>Score:</strong> {result.score}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchDocs;
