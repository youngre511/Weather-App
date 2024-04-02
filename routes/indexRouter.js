const express = require("express");
const axios = require("axios");
const router = express.Router();
const dataParser = require("../data-parser")
const APIkey = process.env.API_KEY

router.get("/", (req, res) => {
	res.render("home", { data: {}, error: ""});
});

router.get("/search", async (req, res) => {
	let query = req.query.search;

	try {
		let coordinateResponse = await axios.get(
			`https://api.openweathermap.org/geo/1.0/zip?zip=${query},US&appid=${APIkey}`
		);

        let lat = coordinateResponse.data.lat
        let lon = coordinateResponse.data.lon

        let forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
        
        let parsedForecast = dataParser(forecast.data)
        res.render("home", {data: parsedForecast, error: ""})

	} catch (error) {
        if (error.response.status === 404) {
            console.error('Invalid ZIP code entered:', query);
            res.render("home", { data: {}, error: "Invalid ZIP code entered. Please try again with a valid ZIP code." });
        } else {
            console.error('An unexpected error occurred', error);
            res.render("home", { data: {}, error: "An unexpected error occurred. Please try again later." });
        }
    }
});

router.get("/:coord/:day", async (req, res) => {
	let coord = req.params.coord.split(" ")
    let lat = coord[0]
    let lon = coord[1]
    let chosenDay = req.params.day

	try {
		let forecast = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
		);
		let parsedForecast = dataParser(forecast.data);
        let dayData = parsedForecast[chosenDay]
		res.render("day-details", { data: dayData, error: "", day: chosenDay });
	} catch (error) {
		if (error.response.status === 404) {
			console.error("Invalid ZIP code entered:", query);
			res.render("home", {
				data: {},
				error:
					"Invalid ZIP code entered. Please try again with a valid ZIP code.",
			});
		} else {
			console.error("An unexpected error occurred", error);
			res.render("home", {
				data: {},
				error: "An unexpected error occurred. Please try again later.",
			});
		}
	}
});

module.exports = router;
