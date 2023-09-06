import OscNotifyDecorator from "./osc-notify-decorator";
import { NgModule } from "@angular/core";
import { TerminalDecorator } from "tabby-terminal";

@NgModule({
	providers: [
		{ provide: TerminalDecorator, useClass: OscNotifyDecorator, multi: true }
	]
})
export default class OscNotifyModule {
}
