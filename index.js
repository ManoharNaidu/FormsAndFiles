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

    // To upload multiple files at a time
    let ImageArray = []

    if (req.files){
        for(let i = 0; i < req.files.sampleFile.length; i++){
            await cloudinary.uploader.upload(req.files.sampleFile[i].tempFilePath,{
                folder: "User"
            })
            .then(result => {
                ImageArray.push({
                    public_id : result.public_id,
                    secure_url : result.secure_url
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('An error occurred during the upload');
            });
        }    
    }

    // To upload one file at a time
    // let file = req.files.sampleFile;
    // const result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder : "User"
    // })
    // console.log(result);

    details = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        ImageArray
    }
    console.log(details);
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