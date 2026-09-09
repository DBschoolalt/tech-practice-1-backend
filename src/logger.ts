export class Logger {
	constructor() {
	}

	public static log(origin: string, message: string) {
		console.log(` [${origin}] ${message}`);
	}
}