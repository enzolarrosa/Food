const { Router } = require("express");
const router = Router();
const { Diet} = require("../db");

router.get("/", async (req, res) => {
    try {
      const diets = await Diet.findAll();
      return res.json(diets);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;