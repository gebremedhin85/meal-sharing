const express = require("express");
require("express-async-errors");
const router = express.Router();
const knex = require("../database");

//to get all meals from table meals
router.get("/", async (req, res) => {
	const reseravtions = await knex("reservations").select("*");
	res.json(reseravtions);
});

router.post("/", async (req, res) => {
	const {  number_of_guests, meal_id, created_date } = req.body;

	const newReservation = {
	  number_of_guests,
	  meal_id,
	  created_date,
	};
	await knex("reservations").insert(newReservation);
	res.send(`new resevation inserted with Id ${newReservation.meal_id}`);
});

//to get a reservation
router.get("/:id", async (req, res) => {
	const reservationId = parseInt(req.params.id);
	const reservation = await knex("reservations")
		.select()
		.where({ id: reservationId });
	res.json(reservation);
});
//changing a reservation
router.put("/:id", async (req, res) => {
	const reservationId = parseInt(req.params.id);
	await knex("reservations")
		.where({ id: reservationId })
		.update({ meal_id: req.query.meal_id });
	res.send(`reservation with id ${reservationId} is updated`);
});

//Deleting a reservation
router.delete("/:id", async (req, res) => {
	let reservationId = parseInt(req.params.id);
	await knex("reservations").where({ id: reservationId }).delete();
	res.send(`reservation with id ${reservationId} is deleted`);
});
router.use((err, req, res, next) => {
	res.status(400).send(err.message);
});

module.exports = router;
