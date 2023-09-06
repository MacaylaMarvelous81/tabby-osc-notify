import { SessionMiddleware } from "tabby-terminal";
import { Observable, Subject } from "rxjs";

const oscPrefix = Buffer.from("\x1b]");
const oscSuffix = Buffer.from("\x07");

export default class OscNotifyMiddleware extends SessionMiddleware {
	tabTitle: string;

	constructor(tabTitle: string) {
		super();

		this.tabTitle = tabTitle;
	}

	get cwdReported$(): Observable<string> {
		return this.cwdReported;
	}
	get copyRequested$(): Observable<string> {
		return this.copyRequested;
	}

	private cwdReported = new Subject<string>();
	private copyRequested = new Subject<string>();

	feedFromSession(data: Buffer): void {
		let startIndex = 0;

		while (data.includes(oscPrefix, startIndex) && data.includes(oscSuffix, startIndex)) {
			const params = data.subarray(data.indexOf(oscPrefix, startIndex) + oscPrefix.length);
			const oscString = params.subarray(0, params.indexOf(oscSuffix)).toString();

			startIndex = data.indexOf(oscSuffix, startIndex) + oscSuffix.length;

			const [ oscCodeString, ...oscParams ] = oscString.split(";");
			const oscCode = parseInt(oscCodeString);

			if (oscCode === 9) {
				// TODO: onclick switch to tab
				new Notification(this.tabTitle, {
					body: oscParams[0]
				});
			} else {
				continue;
			}
		}

		super.feedFromSession(data);
	}

	close(): void {
		this.cwdReported.complete();
		this.copyRequested.complete();
		super.close();
	}
}
