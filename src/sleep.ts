export function sleep(time: number): Promise<NodeJS.Timeout> {
	return new Promise(resolve => setTimeout(resolve, time));
}