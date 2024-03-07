const express = require('express');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    // cloud_name: process,env,cloud_name, its for the production part
    cloud_name: 'ds33dm8cf',
    api_key : '351148593964452',
    api_secret: 'vyYYX7BZaXWN40QKNLZyKSGez7I',
    secure: true
})

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

app.get("/",(req,res) => {
    res.render("welcome");
})

app.get("/simpleGet",(req,res) => {
    console.log(req.query);
    res.send(req.query);
})

app.post("/simplePost", async(req,res) => {
    console.log(req.body);
    console.log(req.files);
    let file = req.files.sampleFile;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder : "User"
    })
    console.log(result);

    details = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        result : result,
    }
    res.send(details);
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