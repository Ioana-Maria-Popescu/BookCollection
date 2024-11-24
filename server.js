const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config");

// Database configuration
const sequelize = new Sequelize(config.development);

// Define a model
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Sync the database and create the table if it doesn't exist
sequelize.sync({ alter: true }).then(() =>
{
  console.log("Database & tables created!");
});

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
  await User.create({ name });
  res.status(201).json({ message: "User added" });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  const user = User.findOne({ where: { username } });
  // Check user credentials
  /*const user = User.findByPk(
    (user) => user.username === username && user.password === password
  );*/

  if (user) {
    // Successful login
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } else {
    // Failed login
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () =>
{
  console.log(`Server is running on http://localhost:${PORT}`);
});
