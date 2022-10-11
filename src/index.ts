#!/usr/bin/env node

import {app} from "./display";

const fs = require('fs');
const path = require('path');

debugger;
// Get args
let args: string[] = process.argv.slice(1);

if (args.length < 5) {
	try {
		// Read configuration if parameters hasn't been passed in cl arguments
		const config_path = process.env.HOME + path.sep + ".simpleWeather.json";
		const data = JSON.parse(
			fs.readFileSync(config_path)
		);

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