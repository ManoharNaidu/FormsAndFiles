const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.get("/simpleGet",(req,res) => {
    console.log(req.query);

    res.send(req.query);
})

app.post("/simplePost",(req,res) => {
    console.log(req.body);
    console.log(req.files);
    res.send({"body" : req.body, "files" : req.files});
})

app.get("/getForm",(req,res) => {
    res.render("getForm");
})
app.get("/postForm",(req,res) => {
    res.render("postForm");
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});