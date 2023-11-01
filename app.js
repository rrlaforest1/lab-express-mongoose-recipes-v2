const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

const Recipe = require("./models/Recipe.model");

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res, next) => {
  try {
    const recipe = { ...req.body };
    const createdRecipe = await Recipe.create(recipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error("Error while creating the recipe ->", error);
    res.status(500).send({ error: "Failed to create the recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    // res.status(200).send(recipes);
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error("Error while retrieving recipes ->", error);
    res.status(500).send({ error: "Failed to retrieve recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneRecipe = await Recipe.findById(id);
    res.status(200).json(oneRecipe);
  } catch (error) {
    console.error("Error while retrieving recipe ->", error);
    res.status(500).send({ error: "Failed to retrieve recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateOneRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(204).json(updateOneRecipe);
    console.log("Recipe edited");
  } catch (error) {
    console.error("Error while editing recipe ->", error);
    res.status(500).send({ error: "Failed to edit recipe" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateOneRecipe = await Recipe.findByIdAndDelete(id);
    console.log("Recipe delete");
    res.status(204).send();
  } catch (error) {
    console.error("Error while deleting recipe ->", error);
    res.status(500).send({ error: "Failed to delete recipe" });
  }
});

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route

const User = require("./models/User.model");

app.post("/users", async (req, res, next) => {
  try {
    const user = { ...req.body };
    const createdUser = await User.create(user);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error while creating the user ->", error);
    res.status(500).send({ error: "Failed to create the user" });
  }
});

//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route

app.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findById(id);
    res.status(200).json(oneUser);
  } catch (error) {
    console.error("Error while retrieving user ->", error);
    res.status(500).send({ error: "Failed to retrieve user" });
  }
});

//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route

app.put("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateOneUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(204).json(updateOneUser);
    console.log("User edited");
  } catch (error) {
    console.error("Error while editing yser ->", error);
    res.status(500).send({ error: "Failed to edit user" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
