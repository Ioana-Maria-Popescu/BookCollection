const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const { Sequelize, DataTypes } = require("sequelize");
//const config = require("./config");
const conn = require("./connection.js")
//const importUserModel = require("./src/models/user.js");
//const User = require("./src/models/user.js");


// Database configuration
//const sequelize = new Sequelize(config.development);

// Define a model
/*const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});*/

// Sync the database and create the table if it doesn't exist
/*sequelize.sync({ alter: true }).then(() =>
{
  console.log("Database & tables created!");
});*/

// Initialize Express
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
/*app.get("/data", async (req, res) =>
{
  const users = await User.findAll();
  res.json(users);
});*/

app.post("/data", async (req, res) =>
{
  const { name } = req.body;
  if (!name)
  {
    return res.status(400).json({ error: "Name is required" });
  }
  await conn.models.User.create({ name });
  res.status(201).json({ message: "User added" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  try {
    const user = await conn.models.User.findOne({ where: { username, password } });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { username: user.username },
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () =>
{
  console.log(`Server is running on http://localhost:${PORT}`);
});
