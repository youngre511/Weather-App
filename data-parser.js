dataParser = function (weatherData) {
	let fiveDayObj = {};
	const dayOptions = { weekday: "long" };
	const timeOptions = { hour: "numeric", hour12: true };
	const lat = weatherData.city.coord.lat;
	const lon = weatherData.city.coord.lon;
	let coordinates = [`${lat}%20${lon}`];
	weatherData.list.forEach(period => {
		let date = new Date(period.dt_txt);
		let day = date.toLocaleString("en-US", dayOptions);
		let hour = date.toLocaleString("en-US", timeOptions);
		let hr = date.toLocaleString("en-US", { hour: "numeric", hour12: false });
		let iconCode = period.weather[0].icon.slice(0, 2);
		let dayPart = hr > 5 && hr < 18 ? "d" : "n";
		let timeAbb = date.toLocaleString("en-US", {
			hour: "numeric",
			hour12: true,
		});
		let cond = defineCondition(
			period.weather[0].id,
			period.wind.speed,
			period.wind.gust,
			period.pop * 100,
			period.main.temp
		);
		let weatherD = {
			temperature: period.main.temp.toFixed(0),
			feelsLike: period.main.feels_like.toFixed(0),
			humidity: period.main.humidity,
			iconAddress: `https://openweathermap.org/img/wn/${iconCode}${dayPart}@2x.png`,
			conditions: cond,
			windSpeed: period.wind.speed,
			windGusts: period.wind.gust,
			precipProb: period.pop * 100,
			timeAbb: timeAbb,
			coord: coordinates,
		};

		if (!fiveDayObj[day]) {
			fiveDayObj[day] = {};
		}
		fiveDayObj[day][hour] = weatherD;
	});
	return fiveDayObj;
};

function defineCondition(weatherCode, windSpeed, gusts, POP, temp) {
	let blowing = "";
	let scattered = POP <= 10 ? "Isolated " : POP <= 55 ? "Scattered " : "";
	if (temp > 30 && (windSpeed > 22 || gusts > 22)) {
		blowing = "Blowing ";
	} else {
		if (windSpeed > 17 || gusts > 17) {
			blowing = "Blowing ";
		}
	}

	switch (weatherCode) {
		case 200:
			return `${scattered}Thunderstorms`;
		case 201:
			return `${scattered}Thunderstorms`;
		case 202:
			return `${scattered}Thunderstorms`;
		case 210:
			return `${scattered}Thunderstorms`;
		case 211:
			return `${scattered}Thunderstorms`;
		case 212:
			return "Heavy Thunderstorms";
		case 221:
			return `${scattered}Thunderstorms`;
		case 230:
			return `${scattered}Thunderstorms`;
		case 231:
			return `${scattered}Thunderstorms`;
		case 232:
			return `${scattered}Thunderstorms`;
		case 300:
			return "Light Drizzle";
		case 301:
			return "Drizzle";
		case 302:
			return "Drizzle";
		case 310:
			return "Drizzle";
		case 311:
			return "Drizzle";
		case 312:
			return "Drizzle";
		case 313:
			return "Drizzle with Scattered Showers";
		case 314:
			return "Drizzle with Scattered Showers";
		case 321:
			return "Drizzle with Scattered Showers";
		case 500:
			return "Light Rainfall";
		case 501:
			return "Moderate Rainfall";
		case 502:
			return "Heavy Rainfall";
		case 503:
			return "Heavy Rainfall";
		case 504:
			return "Heavy Rainfall";
		case 511:
			return "Freezing Rain";
		case 520:
			return "Light Showers";
		case 521:
			return `${scattered}Showers`;
		case 522:
			return `${scattered}Showers`;
		case 531:
			return `${scattered}Showers`;
		case 600:
			return "Snow Flurries";
		case 601:
			return `${blowing}Snow`;
		case 602:
			return "Heavy Snow";
		case 611:
			return "Sleet";
		case 612:
			return "Sleet";
		case 613:
			return "Sleet";
		case 615:
			return "Rain/Snow Mix";
		case 616:
			return "Rain/Snow Mix";
		case 620:
			return `${scattered}Snow Showers`;
		case 621:
			return `${scattered}Snow Showers`;
		case 622:
			return `${scattered}Snow Showers`;
		case 701:
			return "Mist";
		case 711:
			return "Smoke";
		case 721:
			return "Haze";
		case 731:
			return "Dust";
		case 741:
			return "Fog";
		case 751:
			return "Sand";
		case 761:
			return "Dust";
		case 762:
			return "Volcanic Ash";
		case 771:
			return "Squalls";
		case 781:
			return "Tornados";
		case 800:
			return "Clear";
		case 801:
			return "Mostly Clear";
		case 802:
			return "Partly Cloudy";
		case 803:
			return "Mostly Cloudy";
		case 804:
			return "Overcast";
	}
}

// let data = [
// 	{
// 		dt: 1711497600,
// 		main: {
// 			temp: 50.63,
// 			feels_like: 48.45,
// 			temp_min: 46.13,
// 			temp_max: 50.63,
// 			pressure: 1006,
// 			sea_level: 1006,
// 			grnd_level: 980,
// 			humidity: 65,
// 			temp_kf: 2.5,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 92 },
// 		wind: { speed: 13.47, deg: 253, gust: 27.89 },
// 		visibility: 10000,
// 		pop: 0.27,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-27 00:00:00",
// 	},
// 	{
// 		dt: 1711508400,
// 		main: {
// 			temp: 46.62,
// 			feels_like: 41.76,
// 			temp_min: 43.48,
// 			temp_max: 46.62,
// 			pressure: 1009,
// 			sea_level: 1009,
// 			grnd_level: 983,
// 			humidity: 64,
// 			temp_kf: 1.74,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 69 },
// 		wind: { speed: 10.25, deg: 241, gust: 20 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-27 03:00:00",
// 	},
// 	{
// 		dt: 1711519200,
// 		main: {
// 			temp: 42.8,
// 			feels_like: 36.99,
// 			temp_min: 42.8,
// 			temp_max: 42.8,
// 			pressure: 1013,
// 			sea_level: 1013,
// 			grnd_level: 984,
// 			humidity: 70,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 75 },
// 		wind: { speed: 10.31, deg: 242, gust: 19.46 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-27 06:00:00",
// 	},
// 	{
// 		dt: 1711530000,
// 		main: {
// 			temp: 40.3,
// 			feels_like: 34.34,
// 			temp_min: 40.3,
// 			temp_max: 40.3,
// 			pressure: 1014,
// 			sea_level: 1014,
// 			grnd_level: 985,
// 			humidity: 73,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 97 },
// 		wind: { speed: 9.26, deg: 260, gust: 17.38 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-27 09:00:00",
// 	},
// 	{
// 		dt: 1711540800,
// 		main: {
// 			temp: 37.33,
// 			feels_like: 31.66,
// 			temp_min: 37.33,
// 			temp_max: 37.33,
// 			pressure: 1016,
// 			sea_level: 1016,
// 			grnd_level: 987,
// 			humidity: 79,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 64 },
// 		wind: { speed: 7.43, deg: 267, gust: 15.95 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-27 12:00:00",
// 	},
// 	{
// 		dt: 1711551600,
// 		main: {
// 			temp: 41.72,
// 			feels_like: 36.03,
// 			temp_min: 41.72,
// 			temp_max: 41.72,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 990,
// 			humidity: 55,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 30 },
// 		wind: { speed: 9.4, deg: 275, gust: 12.39 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-27 15:00:00",
// 	},
// 	{
// 		dt: 1711562400,
// 		main: {
// 			temp: 47.1,
// 			feels_like: 42.82,
// 			temp_min: 47.1,
// 			temp_max: 47.1,
// 			pressure: 1020,
// 			sea_level: 1020,
// 			grnd_level: 991,
// 			humidity: 41,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 23 },
// 		wind: { speed: 9.01, deg: 269, gust: 11.86 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-27 18:00:00",
// 	},
// 	{
// 		dt: 1711573200,
// 		main: {
// 			temp: 49.26,
// 			feels_like: 44.71,
// 			temp_min: 49.26,
// 			temp_max: 49.26,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 991,
// 			humidity: 36,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 10 },
// 		wind: { speed: 11.27, deg: 275, gust: 14.81 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-27 21:00:00",
// 	},
// 	{
// 		dt: 1711584000,
// 		main: {
// 			temp: 44.71,
// 			feels_like: 40.32,
// 			temp_min: 44.71,
// 			temp_max: 44.71,
// 			pressure: 1020,
// 			sea_level: 1020,
// 			grnd_level: 992,
// 			humidity: 42,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 8 },
// 		wind: { speed: 8.03, deg: 290, gust: 13.76 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-28 00:00:00",
// 	},
// 	{
// 		dt: 1711594800,
// 		main: {
// 			temp: 41.56,
// 			feels_like: 38.19,
// 			temp_min: 41.56,
// 			temp_max: 41.56,
// 			pressure: 1022,
// 			sea_level: 1022,
// 			grnd_level: 993,
// 			humidity: 47,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 0 },
// 		wind: { speed: 5.14, deg: 295, gust: 11.21 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-28 03:00:00",
// 	},
// 	{
// 		dt: 1711605600,
// 		main: {
// 			temp: 39.43,
// 			feels_like: 36.23,
// 			temp_min: 39.43,
// 			temp_max: 39.43,
// 			pressure: 1022,
// 			sea_level: 1022,
// 			grnd_level: 993,
// 			humidity: 51,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 0 },
// 		wind: { speed: 4.47, deg: 298, gust: 9.1 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-28 06:00:00",
// 	},
// 	{
// 		dt: 1711616400,
// 		main: {
// 			temp: 37.74,
// 			feels_like: 37.74,
// 			temp_min: 37.74,
// 			temp_max: 37.74,
// 			pressure: 1022,
// 			sea_level: 1022,
// 			grnd_level: 993,
// 			humidity: 56,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 0 },
// 		wind: { speed: 2.62, deg: 295, gust: 5.08 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-28 09:00:00",
// 	},
// 	{
// 		dt: 1711627200,
// 		main: {
// 			temp: 36.79,
// 			feels_like: 34.36,
// 			temp_min: 36.79,
// 			temp_max: 36.79,
// 			pressure: 1024,
// 			sea_level: 1024,
// 			grnd_level: 994,
// 			humidity: 57,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 3 },
// 		wind: { speed: 3.31, deg: 261, gust: 5.14 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-28 12:00:00",
// 	},
// 	{
// 		dt: 1711638000,
// 		main: {
// 			temp: 45.52,
// 			feels_like: 42.15,
// 			temp_min: 45.52,
// 			temp_max: 45.52,
// 			pressure: 1023,
// 			sea_level: 1023,
// 			grnd_level: 994,
// 			humidity: 41,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 12 },
// 		wind: { speed: 6.31, deg: 254, gust: 10.85 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-28 15:00:00",
// 	},
// 	{
// 		dt: 1711648800,
// 		main: {
// 			temp: 52.66,
// 			feels_like: 49.42,
// 			temp_min: 52.66,
// 			temp_max: 52.66,
// 			pressure: 1021,
// 			sea_level: 1021,
// 			grnd_level: 993,
// 			humidity: 38,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 9 },
// 		wind: { speed: 10.07, deg: 261, gust: 15.68 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-28 18:00:00",
// 	},
// 	{
// 		dt: 1711659600,
// 		main: {
// 			temp: 53.29,
// 			feels_like: 50.25,
// 			temp_min: 53.29,
// 			temp_max: 53.29,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 991,
// 			humidity: 41,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 79 },
// 		wind: { speed: 9.8, deg: 269, gust: 19.04 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-28 21:00:00",
// 	},
// 	{
// 		dt: 1711670400,
// 		main: {
// 			temp: 50.67,
// 			feels_like: 47.88,
// 			temp_min: 50.67,
// 			temp_max: 50.67,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 990,
// 			humidity: 52,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 88 },
// 		wind: { speed: 7.05, deg: 250, gust: 16.2 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-29 00:00:00",
// 	},
// 	{
// 		dt: 1711681200,
// 		main: {
// 			temp: 49.24,
// 			feels_like: 45.79,
// 			temp_min: 49.24,
// 			temp_max: 49.24,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 991,
// 			humidity: 60,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 98 },
// 		wind: { speed: 8.14, deg: 247, gust: 23.09 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-29 03:00:00",
// 	},
// 	{
// 		dt: 1711692000,
// 		main: {
// 			temp: 45.52,
// 			feels_like: 42.28,
// 			temp_min: 45.52,
// 			temp_max: 45.52,
// 			pressure: 1020,
// 			sea_level: 1020,
// 			grnd_level: 991,
// 			humidity: 67,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 79 },
// 		wind: { speed: 6.08, deg: 257, gust: 16.35 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-29 06:00:00",
// 	},
// 	{
// 		dt: 1711702800,
// 		main: {
// 			temp: 45.77,
// 			feels_like: 43.41,
// 			temp_min: 45.77,
// 			temp_max: 45.77,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 990,
// 			humidity: 66,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 69 },
// 		wind: { speed: 4.76, deg: 232, gust: 12.75 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-29 09:00:00",
// 	},
// 	{
// 		dt: 1711713600,
// 		main: {
// 			temp: 45.79,
// 			feels_like: 43.95,
// 			temp_min: 45.79,
// 			temp_max: 45.79,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 990,
// 			humidity: 74,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 85 },
// 		wind: { speed: 4.07, deg: 265, gust: 15.05 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-29 12:00:00",
// 	},
// 	{
// 		dt: 1711724400,
// 		main: {
// 			temp: 53.04,
// 			feels_like: 50.86,
// 			temp_min: 53.04,
// 			temp_max: 53.04,
// 			pressure: 1019,
// 			sea_level: 1019,
// 			grnd_level: 991,
// 			humidity: 60,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 7.94, deg: 242, gust: 14.16 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-29 15:00:00",
// 	},
// 	{
// 		dt: 1711735200,
// 		main: {
// 			temp: 61.29,
// 			feels_like: 59.38,
// 			temp_min: 61.29,
// 			temp_max: 61.29,
// 			pressure: 1017,
// 			sea_level: 1017,
// 			grnd_level: 989,
// 			humidity: 48,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 10.31, deg: 236, gust: 14.41 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-29 18:00:00",
// 	},
// 	{
// 		dt: 1711746000,
// 		main: {
// 			temp: 63.93,
// 			feels_like: 62.1,
// 			temp_min: 63.93,
// 			temp_max: 63.93,
// 			pressure: 1015,
// 			sea_level: 1015,
// 			grnd_level: 987,
// 			humidity: 44,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 99 },
// 		wind: { speed: 12.44, deg: 232, gust: 17.58 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-29 21:00:00",
// 	},
// 	{
// 		dt: 1711756800,
// 		main: {
// 			temp: 58.06,
// 			feels_like: 56.34,
// 			temp_min: 58.06,
// 			temp_max: 58.06,
// 			pressure: 1015,
// 			sea_level: 1015,
// 			grnd_level: 987,
// 			humidity: 59,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 99 },
// 		wind: { speed: 7.65, deg: 200, gust: 18.54 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-30 00:00:00",
// 	},
// 	{
// 		dt: 1711767600,
// 		main: {
// 			temp: 54.82,
// 			feels_like: 53.01,
// 			temp_min: 54.82,
// 			temp_max: 54.82,
// 			pressure: 1015,
// 			sea_level: 1015,
// 			grnd_level: 987,
// 			humidity: 64,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 9.98, deg: 193, gust: 27.16 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-30 03:00:00",
// 	},
// 	{
// 		dt: 1711778400,
// 		main: {
// 			temp: 53.46,
// 			feels_like: 51.69,
// 			temp_min: 53.46,
// 			temp_max: 53.46,
// 			pressure: 1013,
// 			sea_level: 1013,
// 			grnd_level: 985,
// 			humidity: 68,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 10.51, deg: 180, gust: 32.28 },
// 		visibility: 10000,
// 		pop: 0.02,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-30 06:00:00",
// 	},
// 	{
// 		dt: 1711789200,
// 		main: {
// 			temp: 53.87,
// 			feels_like: 52.29,
// 			temp_min: 53.87,
// 			temp_max: 53.87,
// 			pressure: 1010,
// 			sea_level: 1010,
// 			grnd_level: 982,
// 			humidity: 71,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 95 },
// 		wind: { speed: 14.03, deg: 206, gust: 36.64 },
// 		visibility: 10000,
// 		pop: 0.18,
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-30 09:00:00",
// 	},
// 	{
// 		dt: 1711800000,
// 		main: {
// 			temp: 54.41,
// 			feels_like: 53.37,
// 			temp_min: 54.41,
// 			temp_max: 54.41,
// 			pressure: 1010,
// 			sea_level: 1010,
// 			grnd_level: 982,
// 			humidity: 81,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 97 },
// 		wind: { speed: 15.08, deg: 223, gust: 35.46 },
// 		visibility: 10000,
// 		pop: 0.38,
// 		rain: { "3h": 0.12 },
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-30 12:00:00",
// 	},
// 	{
// 		dt: 1711810800,
// 		main: {
// 			temp: 60.03,
// 			feels_like: 59.11,
// 			temp_min: 60.03,
// 			temp_max: 60.03,
// 			pressure: 1010,
// 			sea_level: 1010,
// 			grnd_level: 983,
// 			humidity: 72,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 83 },
// 		wind: { speed: 15.52, deg: 239, gust: 28.16 },
// 		visibility: 10000,
// 		pop: 0.4,
// 		rain: { "3h": 0.44 },
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-30 15:00:00",
// 	},
// 	{
// 		dt: 1711821600,
// 		main: {
// 			temp: 64.4,
// 			feels_like: 63.7,
// 			temp_min: 64.4,
// 			temp_max: 64.4,
// 			pressure: 1009,
// 			sea_level: 1009,
// 			grnd_level: 982,
// 			humidity: 67,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 88 },
// 		wind: { speed: 12.28, deg: 244, gust: 21.05 },
// 		visibility: 10000,
// 		pop: 0.24,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-30 18:00:00",
// 	},
// 	{
// 		dt: 1711832400,
// 		main: {
// 			temp: 67.32,
// 			feels_like: 66.85,
// 			temp_min: 67.32,
// 			temp_max: 67.32,
// 			pressure: 1008,
// 			sea_level: 1008,
// 			grnd_level: 981,
// 			humidity: 66,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 90 },
// 		wind: { speed: 13.67, deg: 235, gust: 20.13 },
// 		visibility: 10000,
// 		pop: 0.14,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-30 21:00:00",
// 	},
// 	{
// 		dt: 1711843200,
// 		main: {
// 			temp: 60.53,
// 			feels_like: 60.37,
// 			temp_min: 60.53,
// 			temp_max: 60.53,
// 			pressure: 1010,
// 			sea_level: 1010,
// 			grnd_level: 982,
// 			humidity: 87,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 95 },
// 		wind: { speed: 10.87, deg: 241, gust: 25.03 },
// 		visibility: 10000,
// 		pop: 0.94,
// 		rain: { "3h": 0.48 },
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-31 00:00:00",
// 	},
// 	{
// 		dt: 1711854000,
// 		main: {
// 			temp: 59.11,
// 			feels_like: 59,
// 			temp_min: 59.11,
// 			temp_max: 59.11,
// 			pressure: 1011,
// 			sea_level: 1011,
// 			grnd_level: 983,
// 			humidity: 91,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 8.16, deg: 247, gust: 23.17 },
// 		visibility: 10000,
// 		pop: 0.84,
// 		rain: { "3h": 0.34 },
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-31 03:00:00",
// 	},
// 	{
// 		dt: 1711864800,
// 		main: {
// 			temp: 57.99,
// 			feels_like: 57.96,
// 			temp_min: 57.99,
// 			temp_max: 57.99,
// 			pressure: 1011,
// 			sea_level: 1011,
// 			grnd_level: 984,
// 			humidity: 95,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 5.68, deg: 257, gust: 16.75 },
// 		visibility: 10000,
// 		pop: 0.92,
// 		rain: { "3h": 0.35 },
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-31 06:00:00",
// 	},
// 	{
// 		dt: 1711875600,
// 		main: {
// 			temp: 56.68,
// 			feels_like: 56.61,
// 			temp_min: 56.68,
// 			temp_max: 56.68,
// 			pressure: 1011,
// 			sea_level: 1011,
// 			grnd_level: 984,
// 			humidity: 97,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 93 },
// 		wind: { speed: 2.8, deg: 276, gust: 4.5 },
// 		visibility: 10000,
// 		pop: 0.42,
// 		rain: { "3h": 0.13 },
// 		sys: { pod: "n" },
// 		dt_txt: "2024-03-31 09:00:00",
// 	},
// 	{
// 		dt: 1711886400,
// 		main: {
// 			temp: 55.6,
// 			feels_like: 55.22,
// 			temp_min: 55.6,
// 			temp_max: 55.6,
// 			pressure: 1013,
// 			sea_level: 1013,
// 			grnd_level: 985,
// 			humidity: 93,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 96 },
// 		wind: { speed: 5.88, deg: 27, gust: 9.57 },
// 		visibility: 10000,
// 		pop: 0.21,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-31 12:00:00",
// 	},
// 	{
// 		dt: 1711897200,
// 		main: {
// 			temp: 56.75,
// 			feels_like: 56.03,
// 			temp_min: 56.75,
// 			temp_max: 56.75,
// 			pressure: 1014,
// 			sea_level: 1014,
// 			grnd_level: 986,
// 			humidity: 83,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 5.55, deg: 63, gust: 6.93 },
// 		visibility: 10000,
// 		pop: 0,
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-31 15:00:00",
// 	},
// 	{
// 		dt: 1711908000,
// 		main: {
// 			temp: 60.01,
// 			feels_like: 59.56,
// 			temp_min: 60.01,
// 			temp_max: 60.01,
// 			pressure: 1013,
// 			sea_level: 1013,
// 			grnd_level: 985,
// 			humidity: 82,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 4.21, deg: 84, gust: 4.74 },
// 		visibility: 10000,
// 		pop: 0.3,
// 		rain: { "3h": 0.13 },
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-31 18:00:00",
// 	},
// 	{
// 		dt: 1711918800,
// 		main: {
// 			temp: 58.64,
// 			feels_like: 58.48,
// 			temp_min: 58.64,
// 			temp_max: 58.64,
// 			pressure: 1012,
// 			sea_level: 1012,
// 			grnd_level: 984,
// 			humidity: 91,
// 			temp_kf: 0,
// 		},
// 		weather: [[Object]],
// 		clouds: { all: 100 },
// 		wind: { speed: 4.59, deg: 55, gust: 9.53 },
// 		visibility: 10000,
// 		pop: 0.98,
// 		rain: { "3h": 1.73 },
// 		sys: { pod: "d" },
// 		dt_txt: "2024-03-31 21:00:00",
// 	},
// ];

// dataParser(data)

module.exports = dataParser;
