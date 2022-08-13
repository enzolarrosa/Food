const { Router } = require("express");
const recipes = require('./Recipes')
const recipe = require('./Recipe')
const diets = require('./Diets')

const router = Router();

router.use('/recipes', recipes);
router.use('/recipes', recipe);
router.use('/diets', diets);


module.exports = router;
