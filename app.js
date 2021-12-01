console.log("you are inside app.js");

//importing modules
const exp = require('express');
const { fstat } = require('fs');
const path = require('path');
const app = exp(); 
const port = 8000;
const bodyparser=require('body-parser');
//connecting mongoDb with node
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
    
  });

//Define the model   
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/public', exp.static('public'));//creating and serving static file. here /public is url and public is folder name 
app.use(exp.urlencoded()) // helps to bring form data to the express.


//PUG SPECIFIC STUFF 
app.set('view engine', 'pug'); //set the template engine-pug
app.set('views', path.join(__dirname, 'views'))//set the pug views directory


//ENDPOINTS
app.get("/", (req, res) => {

    const params = { };
    res.status(200).render('home.pug', params);

})

app.get("/contact", (req, res) => {

    const params = { };
    res.status(200).render('contact.pug', params);

})

app.post("/contact", (req, res) => {

    let myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("The contact form has been saved to the database and we try to reach you as soon as possible.");
    }).catch(()=>{
        res.status(400).send("Form was not saved to the database due to some error");
    })
    // res.status(200).render('contact.pug');
    
})


//START THE SERVER
app.listen(port, () => {
    console.log(`The app started successfully on port ${port}`);

});