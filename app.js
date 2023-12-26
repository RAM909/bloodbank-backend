const express = require("express");
const { backdata, logdetail } = require("./mongo");
const port = process.env.PORT || 8000;


const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const bodyParser = require('body-parser');
require('dotenv').config();


// your other code below


app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {

});


app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const passcheck = await logdetail.findOne({ password: password })
        const passemail = await logdetail.findOne({ email: email })


        if (passcheck && passemail) {
            console.log(email)
            res.json("exist")
        }

        else if (passcheck && !passemail) {
            res.json("wrongemail")
        }

        else if (!passcheck && passemail) {
            res.json("wrongpassword")
        }
        else if (!passcheck && !passemail) {
            res.json("wrong")
        }


    }
    catch (e) {
        res.json("fail")
    }
})




app.post("/add", async (req, res) => {
    const { id, bloodgrp, Rh, DOC, days, DOE, Quantity, name, age, gender, weight, number } = req.body;

    const requiredFields = ['id', 'bloodgrp', 'Rh', 'DOC', 'days', 'DOE', 'Quantity', 'name', 'age', 'gender', 'weight', 'number'];
    if (requiredFields.some(field => !req.body[field])) {
        return res.status(400).json({ error: 'Missing or empty required fields' });
    }

    const data = {
        id: id,
        bloodgrp: bloodgrp,
        Rh: Rh,
        DOC: DOC,
        days: days,
        DOE: DOE,
        Quantity: Quantity,
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        number: number,
    };

    try {
        const check = await backdata.findOne({ id: id });

        if (check) {
            res.json("ID ALREADY EXIST");
        } else {
            const result = await backdata.create(data);
            console.log(result);
            res.json("notexist");
        }
    } catch (e) {
        console.error(e);
        res.json("fail");
    }
});


app.post("/update", async (req, res) => {
    const { id, bloodgrp, Rh, DOC, days, DOE, Quantity, name, age, gender, weight, number } = req.body;

    // const requiredFields = ['id', 'bloodgrp', 'Rh', 'DOC', 'days', 'DOE', 'Quantity', 'name', 'age', 'gender', 'weight', 'number'];
    // if (requiredFields.some(field => !req.body[field])) {
    //     return res.status(400).json({ error: 'Missing or empty required fields' });
    // }
    const filter = { id: id };
    console.log(filter)

    const update = {
        id: id,
        bloodgrp: bloodgrp,
        Rh: Rh,
        DOC: DOC,
        days: days,
        DOE: DOE,
        Quantity: Quantity,
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        number: number,
    };
    console.log(update);

    try {

        const existingDoc = await backdata.findOne(filter);
        console.log(existingDoc);

        const doc = await backdata.findOneAndUpdate(filter, update)

        console.log(doc)
        if (doc) {
            res.json("success");
        }
        else {
            res.json("fail");
        }
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

app.post("/delete", async (req, res) => {
    const { _id } = req.body;

    try {
        const del = await backdata.findByIdAndDelete(_id)
        if (del) {
            res.json("deleted");

        }
        else {
            res.json("fail to delete");
        }
    }
    catch (e) {
        res.json(e);
    }


})

app.get("/patients", async (req, res) => {
    try {
        const patients = await backdata.find();
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(port, () => {
    console.log("port connected");
});
