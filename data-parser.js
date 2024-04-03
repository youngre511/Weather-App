dataParser = function (weatherData) {
  let fiveDayObj = {};
  const dayOptions = { weekday: "long" };
  const timeOptions = { hour: "numeric", hour12: true };
  const lat = weatherData.city.coord.lat;
  const lon = weatherData.city.coord.lon;
  let coordinates = [`${lat}%20${lon}`];

  weatherData.list.forEach((period) => {
    let date = new Date(period.dt_txt);
    let day = date.toLocaleString("en-US", dayOptions);
    let hour = date.toLocaleString("en-US", timeOptions);

    // Work around to deal with API misclassifying day part and assigning day/night based on whether AM or PM, not whether the sun is up
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

module.exports = dataParser;
