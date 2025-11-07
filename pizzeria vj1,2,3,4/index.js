const express = require("express");
const pizzeRouter = require("./routes/pizze");
const narudzbeRouter = require("./routes/narudzbe");

const app = express();
const PORT = 3000;


app.use(express.json());


app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);


app.get("/", (req, res) => {
  res.send(`
    <h1>Pizzeria</h1>
    <p>Rute:</p>
    <ul>
      <li><a href="/pizze">GET /pizze</a> – prikaz svih pizza</li>
      <li><a href="/narudzbe">GET /narudzbe</a> – pregled svih narudžbi</li>
    </ul>
  `);
});


app.use((req, res) => {
  res.status(404).json({ message: "Stranica nije pronađena." });
});


app.listen(PORT, (err) => {
  if (err) {
    console.error(" Greška pri pokretanju servera:", err);
  } else {
    console.log(`Server radi na http://localhost:${PORT}`);
  }
});
