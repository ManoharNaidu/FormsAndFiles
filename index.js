const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/simpleGet",(req,res) => {
    console.log(req.query);

    res.send(req.query);
})

app.get("/getForm",(req,res) => {
    res.render("getForm");
})
app.get("/postForm",(req,res) => {
    res.render("postForm");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});