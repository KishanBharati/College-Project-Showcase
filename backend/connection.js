const mongoose = require('mongoose');

const url = "mongodb+srv://kishanbharati:608kishan608@cluster0.4tmak.mongodb.net/collegeprojectshowcase?retryWrites=true&w=majority&appName=Cluster0"

//asynchronous function - return Promise
mongoose.connect(url)
.then((result) => {
    console.log('connected to db');
})
.catch((err) => {
    console.log(err);
}); 

module.exports = mongoose;