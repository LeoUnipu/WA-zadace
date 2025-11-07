const express = require("express");
const nekretniteRouter=require("./routes/nekretnine");
const ponudeRouter=require("./routes/ponude");

const app=express();
const PORT=3000;

app.use(express.json());

app.get("/",(reg,res)=>{
    res.send(`
        <h1>Agencija za nekretnine</h1>
        <p>Rute:</p>
        <ul>
        <li><a href="/nekretnine">GET /nekretnine</a> – pregled svih nekretnina</li>
        <li><a href="/ponude">GET /ponude</a> – pregled svih ponuda</li>
        </ul>
        `);
});

app.use("/nekretnine",nekretniteRouter);
app.use("/ponude",ponudeRouter);

app.listen(PORT,(error)=>{
    if(error){
        console.error(`Dogodila se greška:, ${err.message}`)
    }
    else{
        console.log(`Server radi na http://localhost:${PORT}`);
    }
});