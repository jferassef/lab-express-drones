const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

/* Since I added a prefix to drones routes on app.js, I will delete that prefix from all the routes in this file.
We don't need it, otherwise all routes will be /drones/drones */

router.get("/", async (req, res, next) => {
  try {
    const drones = await Drone.find();
    res.render("drones/list", { drones });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", async (req, res, next) => {
  /* Missing the indication of the folder where the view is stored. If not, it does not work */
  res.render("drones/create-form");
});

router.post("/create", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drone.create({
      name,
      propellers,
      maxSpeed,
    });
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
    res.render("drones/create-form");
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const drone = await Drone.findById(id);
    res.render("drones/update-form", drone);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;
    await Drone.findByIdAndUpdate(
      id,
      { name, propellers, maxSpeed },
      { new: true }
    );
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Drone.findByIdAndDelete(id);
    res.redirect("/drones");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

/* Great job will all the logic on the routes. Very clear and direct code */