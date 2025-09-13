
const express = require("express");
const initializeDB = require("./db/db.connect");
const Recipe = require("./models/recipe.models");
const app = express();
app.use(express.json()); //middleware

initializeDB();

async function createRecipe(newRecipe) {
    try {
        const recipeAdded = new Recipe(newRecipe);
        const savedRecipe = await recipeAdded.save();
        return savedRecipe;
    } catch (error) {
        console.log("Error in Adding recipe to Database.", error);
    }
}

app.post("/recipes", async(req,res) => {
    try {
        const savedRecipe = await createRecipe(req.body);
        if(savedRecipe) {
            res.status(200).json({message: "Recipe added successfully.", savedRecipe});
        } else {
            res.status(400).json({error: "Error in adding recipe data to Database"});
        }
    } catch(error) {
        res.status(500).json({error: "Error in Adding recipe to DB"});
    }
});

app.get("/", (req,res) => {
    res.send("Connected to Recipe data server");
});

async function readAllRecipes () {
    try {
        const allRecipes = await Recipe.find();
        return allRecipes;
    } catch (error) {
        console.log("Error in fetching recipes from DB", error);
    }
}

app.get("/recipes", async (req,res) => {
    try {
        const allRecipes = await readAllRecipes();
        if(allRecipes.length != 0) {
            res.json(allRecipes);
        } else {
            res.status(400).json({error: "Error in fetching recipes."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to get Recipes."});
    }
});

async function readRecipesByTitle (byTitle) {
    try {
        const recipesByTitle = await Recipe.findOne({title: byTitle});
        return recipesByTitle;
    } catch (error) {
        console.log("Error in fetching recipes from DB", error);
    }
}

app.get("/recipes/:title", async (req,res) => {
    try {
        const recipesByTitle = await readRecipesByTitle(req.params.title);
        if(recipesByTitle.length != 0) {
            res.json(recipesByTitle);
        } else {
            res.status(400).json({error: "Recipe not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to get Recipes."});
    }
});

async function readRecipesByAuthor (byAuthor) {
    try {
        const recipesByAuthor = await Recipe.find({author: byAuthor});
        return recipesByAuthor;
    } catch (error) {
        console.log("Error in fetching recipes from DB", error);
    }
}

app.get("/recipes/author/:author", async (req,res) => {
    try {
        const recipesByAuthor = await readRecipesByAuthor(req.params.author);
        if(recipesByAuthor.length != 0) {
            res.json(recipesByAuthor);
        } else {
            res.status(400).json({error: "Recipe not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to get Recipes."});
    }
});


async function readAllRecipesByDifficulty (byDifficulty) {
    try {
        const allRecipesByDifficulty = await Recipe.find({difficulty: byDifficulty});
        return allRecipesByDifficulty;
    } catch (error) {
        console.log("Error in fetching recipes from DB", error);
    }
}

app.get("/recipes/difficulty/:difficulty", async (req,res) => {
    try {
        const allRecipesByDifficulty = await readAllRecipesByDifficulty(req.params.difficulty);
        if(allRecipesByDifficulty.length != 0) {
            res.json(allRecipesByDifficulty);
        } else {
            res.status(400).json({error: "Recipe not found."});
        }
    } catch(error) {
        res.status(500).json({error: "Failed to get Recipes."});
    }
});

const updateDificultyLevelById = async (id, newDifficulty) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, {difficulty: newDifficulty}, {new: true});
        return updatedRecipe;
    } catch(error) {
        console.log("Error in updating difficulty.", error);
    }
};

app.post("/recipes/:id/:difficulty", async(req,res) => {
    try {
        const updatedRecipe = await updateDificultyLevelById(req.params.id,req.params.difficulty);
        if(updatedRecipe.length !== 0) {
            res.status(200).json({message: "Recipe difficulty updated successfully", updatedRecipe});
        } else {
            res.status(400).json({error: "Error in updating recipe."});
        }
    } catch (error) {
        res.status(500).json({error: "Recipe not found"});
    }
});

const updateRecipeById = async (byTitle, dataToUpdate) => {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({title: byTitle}, dataToUpdate, {new: true});
        return updatedRecipe;
    } catch(error) {
        console.log("Error in updating difficulty.", error);
    }
};

app.post("/recipes/:title", async(req,res) => {
    try {
        const updatedRecipe = await updateRecipeById(req.params.title,req.body);
        if(updatedRecipe.length !== 0) {
            res.status(200).json({message: "Recipe updated successfully", updatedRecipe});
        } else {
            res.status(400).json({error: "Error in updating recipe."});
        }
    } catch (error) {
        res.status(500).json({error: "Recipe not found"});
    }
});

const DeleteRecipeById = async (id) => {
    try {
        const deletedData = await Recipe.findByIdAndDelete(id);
        return deletedData;
    } catch(error) {
        console.log("Error in deleting data", error);
    }
};

app.delete("/recipes/:id", async (req,res) => {
    try {
        const deletedData = await DeleteRecipeById(req.params.id);
        if(deletedData.length !== 0) {
            res.status(200).json({message: "Recipe deleted successfully.", deletedData});
        } else {
            res.status(400).json({error: "Error in deleting recipe."});
        }
    } catch (error) {
        res.status(500).json({error: "Recipe not found."})
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server is running on port", PORT);
});
