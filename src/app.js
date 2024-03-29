const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

// call app.use so we can parse the request body that contain JSON objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    // Send restaurants as converted to a JSON string .
    res.json(restaurants);
})

// create a request to retrieve a specific restaurant
app.get("/restaurants/:id", async (req, res, next) => {
    // Send error if restaurant cannot be found
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            throw new Error('restaurant not found.');
        }
        res.json(restaurant);
    } catch (error) {
        next(error)
    }
})

// create a request to update a resturant
app.put("/restaurants/:id", async (req, res, next) => {
    // Send error if restaurant cannot be found
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            throw new Error('restaurant not found.');
        }
        const updatedRest = await restaurant.update(req.body);
        res.json(updatedRest);
    } catch (error) {
        next(error)
    }
})

// create a request to add a resturant
app.post("/restaurants", async (req, res, next) => {
    // Send error if restaurant cannot be found
    try {
        const newRest = await Restaurant.create(req.body);
        if (!newRest) {
            throw new Error('restaurant not found.');
        }
        res.json(newRest);
    } catch (error) {
        next(error)
    }
})

// create a request to delete a resturant
app.delete("/restaurants/:id", async (req, res, next) => {
    // Send error if restaurant cannot be found
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            throw new Error('restaurant not found.');
        }
        const deletedRest = await restaurant.destroy();
        res.json(deletedRest);
    } catch (error) {
        next(error)
    }
})
module.exports = app;