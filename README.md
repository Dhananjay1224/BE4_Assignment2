## Defined GET, POST and DELETE routes to get, create or update, delete recipe data from Database.

### 1) /recipes
To get all recipes from DB
### 2) /recipes/:title
To get recipe from DB by title of recipe. Here :title is a dynamic value.
### 3) /recipes/author/:author
To get all recipes from DB by Author of recipe. Here :author is a dynamic value.
### 4) /recipes/difficulty/:difficulty
To get all recipes from DB by difficulty of recipe. Here :difficulty is a dynamic value.
### 5) /recipes/:id/:difficulty
To update difficulty level of recipe by id. Here :id is the recipe id from database and :difficulty is the difficulty level with which you want to update.
### 6) /recipes/:title
To find the recipe by title in Database and pass the data you want to update in request body in json format and it will be updated in Database.
### 7) /recipes/:id
To delete the recipe by id. Here id is the recipe id you want to delete from database.
