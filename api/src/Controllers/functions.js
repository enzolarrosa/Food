require("dotenv").config();
const {APYKEY} = process.env;
const { Diet,Recipe } = require("../db");
const { default: axios} = require("axios");
const { Op } = require("sequelize");


const dbQuery= async (name) => {
    let recipesFinded = await Recipe.findAll({
      where: {
        name: {
          [Op.substring]: `${name}`,
        },
      },
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
        attributes: ["name"],
      },
    });
    return recipesFinded
  }
  
  const apiQuery = async (name) => {
    let recipesFinded= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APYKEY}&number=100&addRecipeInformation=true`);
    let byName= await recipesFinded.data.results.filter(r => r.title.includes(name));
    if(byName) {
      byName= await byName.map( e => {
        return {
          id: e.id,
          name: e.title,
          summary: e.summary.replace(/<[^>]+>/g, ""),
          healthScore: e.healthScore,
          instructions: e.analyzedInstructions[0]?.steps.map((e) => e.step ?? e.step).join(),
          image: e.image,
          diets: e.diets.map(e => {return {name: e}}),
        }
      })
    }
    return byName
  }
  
  const apiID= async (id) => {
    const url = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APYKEY}`);
    const date=  url.data;
    return {
      id: date.id,
      name: date.title,
      summary: date.summary,
      healthScore: date.healthScore,
      instructions: date.analyzedInstructions[0]?.steps.map((e) => e.step ?? e.step).join(),
      image: date.image,
      diets: date.diets
    }
  }
  
  const dbId= async (id) => {
    const url = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: []}
      }
    })
    return {
      id: url.id,
      name: url.title,
      summary: url.summary,
      healthScore: url.healthScore,
      instructions: url.instructions,
      image: url.image,
      diets: url.diets.map( e => e.name)
    }
  }
  
  const allId = async (id) => {
    try {
      if(id.includes('-')){
        const db= await dbId(id);
        return db;
      }
      const api= await apiID(id);
      return api;
    } catch (error) {
      console.log(error)
    }
  
  }

module.exports = {
    dbQuery,
    apiQuery,
    apiID,
    dbId,
    allId
}