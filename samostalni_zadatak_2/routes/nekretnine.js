const express = require("express");
const router = express.Router();

const nekretnine = [
  { id: 1, naziv: "Stan Centar", opis: "2-soban, renoviran", cijena: 145000, lokacija: "Pula", broj_soba: 2, povrsina: 58 },
  { id: 2, naziv: "Kuća Veruda", opis: "Dvokatnica s vrtom", cijena: 320000, lokacija: "Pula", broj_soba: 5, povrsina: 180 }
];

let sljedeciId = 1;
if (nekretnine.length > 0) {
  sljedeciId = nekretnine[nekretnine.length - 1].id + 1;
}


router.get("/", (req, res) => {
  res.json(nekretnine);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ poruka: "ID mora biti broj" });
  }

  const nadjena = nekretnine.find(n => n.id === id);

  if (!nadjena) {
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });
  } else {
    res.json(nadjena);
  }
});

router.post("/", (req, res) => {
  const greska = provjeriUnosZaKreiranje(req.body);
  if (greska) return res.status(400).json({ poruka: greska });

  const nova = { id: sljedeciId++, ...req.body };
  nekretnine.push(nova);
  res.status(201).json(nova);
});


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ poruka: "ID mora biti broj." });
  }

  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ poruka: "Nekretnina nije pronađena." });
  }

  const greska = provjeriUnosZaKreiranje(req.body);
  if (greska) return res.status(400).json({ poruka: greska });

  nekretnine[index] = { id, ...req.body };
  res.json(nekretnine[index]);
});


router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ poruka: "ID mora biti broj." });
  }

  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ poruka: "Nekretnina nije pronađena." });
  }

  const greska = provjeriUnosZaAzuriranje(req.body);
  if (greska) return res.status(400).json({ poruka: greska });

  nekretnine[index] = { ...nekretnine[index], ...req.body, id };
  res.json(nekretnine[index]);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ poruka: "ID mora biti broj." });
  }

  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ poruka: "Nekretnina nije pronađena." });
  }

  nekretnine.splice(index, 1); // bio je slice()
  res.status(204).send();
});


function pozitivanBroj(x) {
  return typeof x === "number" && isFinite(x) && x >= 0;
}

function provjeriUnosZaKreiranje(body) {
  const obavezna = ["naziv", "opis", "cijena", "lokacija", "broj_soba", "povrsina"];
  for (const k of obavezna) {
    if (!(k in body)) return `Nedostaje polje '${k}'.`;
  }
  if (!pozitivanBroj(body.cijena)) return "Cijena mora biti veća ili jednaka 0.";
  if (!pozitivanBroj(body.broj_soba)) return "Broj soba mora biti veći ili jednak 0.";
  if (!pozitivanBroj(body.povrsina)) return "Površina mora biti veća ili jednaka 0.";
  return null;
}

function provjeriUnosZaAzuriranje(body) {
  if ("cijena" in body && !pozitivanBroj(body.cijena)) return "Cijena mora biti veća ili jednaka 0.";
  if ("broj_soba" in body && !pozitivanBroj(body.broj_soba)) return "Broj soba mora biti veći ili jednak 0.";
  if ("povrsina" in body && !pozitivanBroj(body.povrsina)) return "Površina mora biti veća ili jednaka 0.";
  return null;
}

module.exports = router;
module.exports.nekretnine = nekretnine;
