const {Router} = require("express");
const router= Router()
const {dbQuery,apiQuery,allId} = require('../Controllers/functions')


router.get("/", async (req, res) => {
  const { name } = req.query;
  const db = await dbQuery()
  const api= await apiQuery()
  const all= await db.concat(api)
  if (!name) { 
    return res.json(all) }
  else {
    const recipes= all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
      return res.json(
        recipes
          ? recipes
          : "no hay recetas con ese nombre"
      );
    } 
});

router.get("/:id", async (req,res) => {
    const {id} = req.params;
    try {
      const recipe= await allId(id)
      if(recipe){ return res.json(recipe)}
      return res.status(404).send('ID no encontrado')
    } catch (error) {
      res.status(404).send('Recipe no encontrada')
    }
  })

  module.exports = router
  