import express from "express";


const app = express();

app.get("/", (req, res) => {
    res.send("Working")
})

app.listen(3000, () => {
    console.log("Now listen on port 3000")
})