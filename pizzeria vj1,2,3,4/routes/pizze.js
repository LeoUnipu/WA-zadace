const express = require("express");
const router = express.Router();


const pizze = [
  { id: 1, naziv: "Margherita",  cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Vegetariana", cijena: 9.0 }
];


router.get("/", (req, res) => {
  res.json(pizze);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  const pizza = pizze.find(p => p.id === id);

  if (!pizza) {
    return res.status(404).json({ message: "Pizza nije pronađena." });
  }

  res.json(pizza);
});


module.exports = router;
module.exports.pizze = pizze;
