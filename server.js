const express = require("express");

// Create a new express application instance
const app = express();

// Send a basic "Coming soon" message to the user
app.get("/", (req, res) => {
  res.send("Coming soon!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
