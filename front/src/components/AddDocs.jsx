import React, { useState } from 'react';

function AddDocs() {
  const [files, setFiles] = useState([]);

  // Function to process file content
  const processFileContent = (content) => {
    return content.replace(/"/g, "'"); // Replace all double quotes with single quotes
  };

  // Handle folder selection
  const handleFolderSelect = (e) => {
    const selectedFiles = e.target.files;
    const filesArray = [];

    // Loop through the selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Read the file content
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const processedContent = processFileContent(reader.result);
          filesArray.push({ name: file.name, content: processedContent });
          if (filesArray.length === selectedFiles.length) {
            const filteredFiles = filesArray.filter(file => file.name.trim() !== ".DS_Store");

            setFiles(filteredFiles);
          }
        } catch (error) {
          console.error('Error processing file:', error);
        }
      };

      reader.readAsText(file); // Read the file content as text
    }
  };

  // Send data to the backend
  const handleSendData = async () => {
    try {
      console.log(files);

      // Send the files array directly without wrapping it in an object
      const response = await fetch('http://localhost:4000/api/docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(files), // Send the array directly
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = JSON.parse(response);
      setFiles([])
      console.log('Response from server:', data);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <h1>Add Documents</h1>

      {/* Button to select a folder */}
      <input 
        type="file" 
        webkitdirectory="true" 
        directory="true" 
        onChange={handleFolderSelect} 
        style={{ marginBottom: '20px' }}
      />
      
      {/* Button to send the files to the server */}
      <button onClick={handleSendData}>Send Files</button>

      {/* Display the files selected */}
      <div>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <strong>{file.name}</strong><br />
               
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddDocs;
