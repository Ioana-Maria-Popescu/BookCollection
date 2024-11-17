const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config");

// Database configuration
const sequelize = new Sequelize(config.development);

// Define a model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database and create the table if it doesn't exist
sequelize.sync({ force: true }).then(() =>
{
  console.log("Database & tables created!");
});

// Initialize Express
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/data", async (req, res) =>
{
  const users = await User.findAll();
  res.json(users);
});

app.post("/data", async (req, res) =>
{
  const { name } = req.body;
  if (!name)
  {
    return res.status(400).json({ error: "Name is required" });
  }
  await User.create({ name });
  res.status(201).json({ message: "User added" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () =>
{
  console.log(`Server is running on http://localhost:${PORT}`);
});
