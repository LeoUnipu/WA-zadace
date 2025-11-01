const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});


app.get("/users", (req, res) => {
  const korisnici = [
    { id: 1, ime: "Ana", prezime: "Anić" },
    { id: 2, ime: "Marko", prezime: "Markić" },
    { id: 3, ime: "Iva", prezime: "Ivić" }
  ];
  res.json(korisnici);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška pri pokretanju: ${error.message}`);
  } else {
    console.log(`Server radi na http://localhost:${PORT}`);
  }
});
