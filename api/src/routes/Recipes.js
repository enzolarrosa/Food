const {Router} = require("express");
const router= Router()
const {dbQuery,apiQuery,allId} = require('../Controllers/functions')


router.get("/", async (req, res) => {
  const { name } = req.query;
  const db = await dbQuery(name)
  const api= await apiQuery(name)
  const all= await db.concat(api)
  if (!name) { return res.json(all) }
  else {
    try {
      return res.json(
        all
          ? all
          : "no hay recetas con ese nombre"
      );
    } catch (error) {
       return res.send({ error: error.message });
    }
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
  