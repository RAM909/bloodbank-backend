const mongoose = require("mongoose");
require('dotenv').config();

const DATABASE = process.env.REACT_APP_DB_URI;


if (!DATABASE) {
    console.error("Error: MongoDB connection string is not defined.");
    process.exit(1); // Exit the process with an error code
}



mongoose.connect(DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((err) => {
    console.log(err);
})


const newSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    bloodgrp: {
        type: String,
        required: true
    },
    Rh: {
        type: String,
        required: true
    },
    DOC: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    DOE: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

const newlog = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const backdata = mongoose.model("backdata", newSchema)
const logdetail = mongoose.model("logdetail", newlog)


module.exports = {
    backdata,
    logdetail
};
