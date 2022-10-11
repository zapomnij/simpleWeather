import 'http';
import * as http from "http";

// Return promise for HTTP request
export function getRequestPromise(opts: http.RequestOptions | URL | string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		let data = "";
		let httpReq = http.request(opts, (response) => {
			response.setEncoding("utf-8");

			response.on('data', (chunk: string) => {
				data += chunk;
			});

			response.on('end', () => {
				resolve(data);
			});

			response.on('error', (error) => {
				reject(error.message);
			});
		});

		httpReq.end();
	});
}