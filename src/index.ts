#!/usr/bin/env node

// Import async `app` function from display.ts
import {app} from "./display";

const fs = require('fs');
const path = require('path');

// Get args
let args: Array<string> = process.argv.slice(1);

// If no args, read configuration
if (args.length < 5) {
	try {
		// Read configuration if parameters hasn't been passed in cl arguments
		const config_path = (process.platform == 'win32') ? path.join(process.env.appdata, 'simpleWeather', 'sWea.json') : path.join(process.env.HOME, ".config", "sWea.json");
		const data = JSON.parse(
			fs.readFileSync(config_path)
		);

		// Reassign args string array
		args = [];
		// Put parameters in arguments variable
		args.push("", data.latitude, data.longitude, data.timezone, data.refresh);
	} catch (error) {
		console.error("Error while checking for config: " + error);
		process.exit(1);
	}
}

// Call async app function
app(Number(args[1]), Number(args[2]), args[3], Number(args[4])).catch((error) => {
	console.error("async function app: " + error);
	process.exit(1);
});