const express = require('express')
const Model = require('../models/userModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/add', (req, res) =>{
    console.log(req.body);    
    new Model(req.body)
    .save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);   
    });

});

// getall
router.get('/getall', (req, res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);        
    });
});

router.get('/getbyemail', (req, res) => {
    res.send('response from user getbyemail');
});

// url parameter
router.get("/getbycity/:city", (req, res) =>{
    Model.find({ city: req.params.city })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json (result);
        }) .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
});

//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);        
    });
});

//delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        
        if(result){
            //login Success
            //generate token

            const{_id, name, email} = result;
            const payload = {_id, name, email};

            jwt.sign(
                payload, 
                process.env.JWT_SECRET,
                {expiresIn: '2d' },
                (err, token) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json(err);
                    }else{
                        res.status(200).json({ token });
                    }
                }
             )

        }else{
            //login failed
            res.status(401).json({message: "Invalid credentials"});
        }

    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;