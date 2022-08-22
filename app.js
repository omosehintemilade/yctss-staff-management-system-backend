const express = require("express");
const path = require("path");
const cors = require("cors");
const instantiateDB = require("./connectDB");

const app = express();

app.use(express.json());

// Set Public Folder as static Path
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/users", require("./routes/user"));
app.use("/admins", require("./routes/admin"));

const port = 8000;

app.listen({ port }, async () => {
  console.log(`Server running on port ${port}`);
  // Connect DB
  await instantiateDB();
});
