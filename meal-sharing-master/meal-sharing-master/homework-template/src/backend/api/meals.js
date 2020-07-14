const express = require("express");
require("express-async-errors");
const router = express.Router();
const knex = require("../database");
const { sum, limit } = require("../database");

//to inser a new meal
router.post("/", async (req, res) => {
	const {
		title,
		description,
		location,
		for_when,
		max_reservations,
		price,
		created_date,
	} = req.body;
	const newMeal = {
		title,
		description,
		location,
		for_when,
		max_reservations,
		price,
		created_date,
	};
	await knex("meals").insert(newMeal);
	res.send(`new meal inserted: ${newMeal.title}`);
});

//to get a meal by id
router.get("/:id", async (req, res) => {
	const mealId = parseInt(req.params.id);
	const meal = await knex("meals").where({ id: mealId });
	res.json(meal);
});

//to put/update a meal with specific id
router.put("/:id", async (req, res) => {
	let mealId = parseInt(req.params.id);

	await knex("meals").where({ id: mealId }).update({ title: req.query.title });
});

router.delete("/:id", async (req, res) => {
	let mealId = parseInt(req.params.id);
	await knex("meals").where({ id: mealId }).delete();
});

//to get all meals from table meals and
//Quering meals table
router.get("/", async (req, res) => {
	const {
		maxPrice,
		availableReservations,
		title,
		createdAfter,
		limit,
	} = req.query;

	let queredMeals = knex("meals");

	if (maxPrice) {
		const maxPriceToNum = parseInt(maxPrice);
		queredMeals = queredMeals.where("price", "<", maxPriceToNum);
	}
	if (title) {
		queredMeals = queredMeals.where("title", "like", `%${title}%`);
	}
	if (availableReservations === "true") {
		queredMeals = queredMeals
			.join("reservations", "meals.id", "=", "reservations.meal_id")
			.where("meal.for_when", ">=", knex.fn.now())
			.andWhere("meals.max_reservations", ">", "reservations.number_of_guests");
	}
	if (createdAfter) {
		const timeCreatedAfter = new Date(createdAfter);
		queredMeals = queredMeals.where("created_date", ">", timeCreatedAfter);
	}
	if (limit) {
		const limitTo = parseInt(req.query.limit);
		queredMeals = queredMeals.limit(limitTo);
	}
	const queryOutput = await queredMeals.select("*");
	if (queryOutput.length === 0 || availableReservations === "false") {
		res.status(404).send("404 Error. It is not found");
	}
	res.json(queryOutput);
});

router.use((err, req, res, next) => {
	res.status(400).send(err.message);
});

module.exports = router;
