const {Router} = require('express')
const router= Router()
const {Recipe,Diet} = require('../db')


router.post("/", async (req, res) => {
    const { name, summary, healthScore, image, instructions, diets } = req.body;
    try {
      const neew = await Recipe.create({
        name,
        summary,
        healthScore,
        image,
        instructions,
      });
      diets.map(async (e) => {
        let dietDB = await Diet.findAll({
          where: { name: e.toLowerCase() },
        });
        await neew.addDiet(dietDB);
      });
      res.send('Receta ' + name +  ' creada con exito');
    } catch (error) { res.json({Error: 'No se pudo crear la receta con exito'})}
  });

  module.exports= router