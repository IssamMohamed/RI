require('dotenv').config();
const express = require('express');
const cors = require('cors');



// Create Express app
const app = express();
app.use(cors());
app.use(express.json({ limit: '500mb' })); // 50MB limit for JSON requests
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
   
    next();
});

// Route setup
const docs= require("./routes/insertDocsRouter");
app.use("/api", docs);

const query= require('./routes/query');
app.use('/api', query);

// Database connection


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
