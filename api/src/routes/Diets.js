const { Router } = require("express");
const router = Router();
const { Diet} = require("../db.js");

router.get("/", async (req, res) => {
    try {
      const diets = await Diet.findAll();
      return res.json(diets);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const dietas = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low fodmap",
        "whole 30",
      ];
      dietas.forEach(async (element) => await Diet.create({ name: element }));
      return res.send('hola')
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;