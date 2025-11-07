const express = require("express");
const router = express.Router();

const { nekretnine } = require("./nekretnine");


let ponude = [];
let sljedeciIdPonude = 1;

function pozitivanBroj(x) {
  return typeof x === "number" && isFinite(x) && x >= 0;
}


router.get("/", (req, res) => {
  res.json(ponude);
});


router.post("/", (req, res) => {
  const { nekretninaId, ime, prezime, cijena, telefon } = req.body;

  
  if (nekretninaId == null || !ime || !prezime || cijena == null || !telefon) {
    return res.status(400).json({ poruka: "Nedostaju podaci: nekretninaId, ime, prezime, cijena, telefon." });
  }

  const idN = Number(nekretninaId);
  if (Number.isNaN(idN)) return res.status(400).json({ poruka: "nekretninaId mora biti broj." });
  if (!pozitivanBroj(cijena)) return res.status(400).json({ poruka: "Cijena ponude mora biti veća ili jednaka 0." });


  const nek = nekretnine.find(n => n.id === idN);
  if (!nek) return res.status(404).json({ poruka: "Nekretnina s tim ID-em ne postoji." });

  const nova = {
    id: sljedeciIdPonude++,
    nekretninaId: idN,
    ime,
    prezime,
    cijena,
    telefon,
    vrijeme: new Date().toISOString()
  };

  ponude.push(nova);
  res.status(201).json(nova);
});

module.exports = router;
