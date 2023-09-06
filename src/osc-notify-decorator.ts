import OscNotifyMiddleware from "./osc-notify-middleware";
import { Injectable } from "@angular/core";
import { TerminalDecorator, BaseSession, BaseTerminalTabComponent } from "tabby-terminal";

@Injectable()
export default class OscNotifyDecorator extends TerminalDecorator {
	attach(tab: BaseTerminalTabComponent<any>): void {
		// Subscribe to attach to future sessions in this tab
		tab.sessionChanged$.subscribe((session) => {
			if (session) {
				this.attachToSession(session, (<any>tab).title);
			}
		});

		// Attach the current session for this tab
		if (tab.session) {
			this.attachToSession(tab.session, (<any>tab).title);
		}
	}

	private attachToSession(session: BaseSession, tabTitle: string) {
		const middleware = new OscNotifyMiddleware(tabTitle);

		session.middleware.push(middleware);
	}
}
