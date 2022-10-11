import color from "colorts";
import {sleep} from "./sleep";
import {getRequestPromise} from "./http";

export async function app(longitude: number, latitude: number, timezone: string, refresh: number) {
	while (true) {
		// Get weather API response and parse returned JSON
		const resp = JSON.parse(await getRequestPromise(
			new URL(`http://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${timezone}`)
		));

		// Check if an error is present
		if (resp.error) {
			throw `API error: '${resp["reason"]}`;
		}

		// Get some parameters from API response
		const current = resp.current_weather;
		const weatherCode: number = current.weathercode;
		const temperature: number = current.temperature;

		// Create a weather string and image array for ascii art
		let image: Array<string> = [];
		let weather: string;
		if (weatherCode == 0) {
			image.push(
				color("  \\   |   /\t").yellow.toString(),
				color("   \\.-'-./\t").yellow.toString(),
				color("---'     '---\t").yellow.toString(),
				color("   /'-.-'\\\t").yellow.toString(),
				color("  /   |   \\\t").yellow.toString()
			);

			weather = "Clear Sky";
		} else if (weatherCode <= 3) {
			image.push(
				color("  \\   |   /\t").yellow.toString(),
				color("   \\.-'-./\t").yellow.toString(),
				color("---'     '---\t").yellow.toString(),
				color("   /'-. ").yellow.toString() + color(".-'-.'.\t").white.toString(),
				color("  /   | ").yellow.toString() + color("'-_.-'\t").white.toString()
			);

			weather = "Partly cloudy";
		} else if (weatherCode <= 48) {
			image.push(
				color(".-'-.-'.-'\t").grey.toString(),
				color(".-'-.-'.-'\t").grey.toString(),
				color(".-'-.-'.-'\t").grey.toString(),
				color(".-'-.-'.-'\t").grey.toString(),
				color(".-'-.-'.-'\t").grey.toString(),
			);

			weather = "Fog";
		} else if (weatherCode <= 55) {
			image.push(
				color("' . ' . ' .\t").blue.toString(),
				color("' . ' . ' .\t").blue.toString(),
				color("' . ' . ' .\t").blue.toString(),
				color("' . ' . ' .\t").blue.toString(),
				color("' . ' . ' .\t").blue.toString()
			);

			weather = "Light drizzle";
		} else if (weatherCode <= 57) {
			image.push(
				color("'.'.'.'.'.'\t").blue.toString(),
				color("'.'.'.'.'.'\t").blue.toString(),
				color("'.'.'.'.'.'\t").blue.toString(),
				color("'.'.'.'.'.'\t").blue.toString(),
				color("'.'.'.'.'.'\t").blue.toString(),
			);

			weather = "Freezing drizzle";
		} else if (weatherCode <= 65) {
			image.push(
				color("| | | | | |\t").blue.toString(),
				color(" | | | | |\t").blue.toString(),
				color("| | | | | |\t").blue.toString(),
				color(" | | | | |\t").blue.toString(),
				color("| | | | | |\t").blue.toString(),
			);

			weather = "Rain";
		} else if (weatherCode <= 67 || ((weatherCode >= 80) && (weatherCode <= 82))) {
			image.push(
				color("|||||||||||||\t").blue.toString(),
				color("|||||||||||||\t").blue.toString(),
				color("|||||||||||||\t").blue.toString(),
				color("|||||||||||||\t").blue.toString(),
				color("|||||||||||||\t").blue.toString(),
			);

			weather = "Freezing rain";
		} else if (weatherCode <= 75 || weatherCode == 85 || weatherCode == 86) {
			image.push(
				color("* * * * * *\t").white.toString(),
				color(" * * * * *\t").white.toString(),
				color("* * * * * *\t").white.toString(),
				color(" * * * * *\t").white.toString(),
				color("* * * * * *\t").white.toString(),
			);

			weather = "Snow fall";
		} else if (weatherCode <= 77) {
			image.push(
				color(". ' . ' . '\t").white.toString(),
				color(" ' . ' . '\t").white.toString(),
				color("' . ' . ' .\t").white.toString(),
				color(" ' . ' . '\t").white.toString(),
				color(". ' . ' . '\t").white.toString(),
			);

			weather = "Snow grains";
		} else if (weatherCode >= 95) {
			image.push(
				color(".-'-'-..-'.\t").grey.toString(),
				color("'-'-.'.'--'\t").grey.toString(),
				color("    / /_\t").yellow.toString(),
				color("   /_  /\t").yellow.toString(),
				color("    /_/ \t").yellow.toString()
			);

			weather = "Thunderstorm";
		}

		// Clear the console
		console.clear();

		// Print information about weather
		console.log(image[0] + `Weather: ${weather}`);
		console.log(image[1] + `Temperature: ${temperature}`);
		console.log(image[2] + `Timezone: ${resp.timezone}`);
		console.log(image[3] + `Wind speed: ${current.windspeed}`);
		console.log(image[4] + "Date: " + new Date(current.time));

		// Wait passed number of seconds in `refresh` parameter
		await sleep(refresh * 1000);
	}
}