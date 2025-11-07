const express = require("express");
const { pizze } = require("./pizze");

const router = express.Router();

let narudzbe = [];
let sljedeciId = 1;


function cijenaPizze(naziv) {
  const pizza = pizze.find(p => p.naziv.toLowerCase() === naziv.toLowerCase());
  return pizza ? pizza.cijena : null;
}

router.post("/", (req, res) => {
  const { stavke, klijent } = req.body;

 
  if (!Array.isArray(stavke) || stavke.length === 0) {
    return res
      .status(400)
      .json({ message: "Pošalji polje stavki: [{ pizza, kolicina }]" });
  }

  let ukupnaCijena = 0;


  for (const stavka of stavke) {
    if (!stavka.pizza || !stavka.kolicina) {
      return res
        .status(400)
        .json({ message: "Svaka stavka mora imati 'pizza' i 'kolicina'." });
    }

    const cijena = cijenaPizze(stavka.pizza);
    if (cijena === null) {
      return res
        .status(400)
        .json({ message: `Pizza '${stavka.pizza}' ne postoji.` });
    }

    if (stavka.kolicina <= 0) {
      return res
        .status(400)
        .json({ message: "Kolicina mora biti veća od 0." });
    }

    ukupnaCijena += cijena * stavka.kolicina;
  }


  ukupnaCijena = Number(ukupnaCijena.toFixed(2));

 
  const novaNarudzba = {
    id: sljedeciId++,
    stavke,
    klijent: klijent || null,
    ukupno: ukupnaCijena,
    vrijeme: new Date().toISOString(),
  };

  narudzbe.push(novaNarudzba);

  res.status(201).json({
    poruka: "Narudžba zaprimljena!",
    id: novaNarudzba.id,
    ukupno: ukupnaCijena,
    klijent: klijent || "Nije naveden",
  });
});


router.get("/", (req, res) => {
  res.json(narudzbe);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  const trazena = narudzbe.find(n => n.id === id);

  if (!trazena) {
    return res.status(404).json({ message: "Narudžba nije pronađena." });
  }

  res.json(trazena);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  const index = narudzbe.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Narudžba nije pronađena." });
  }

  narudzbe.splice(index, 1);
  res.status(204).send(); 
});

module.exports = router;
