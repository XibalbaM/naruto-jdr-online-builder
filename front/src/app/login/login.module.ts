import {NgModule} from "@angular/core";

import {LoginRoutingModule} from "./login-routing.module";
import {InputComponent} from "./components/input/input.component";
import {CallbackComponent} from "./components/callback/callback.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LogoComponent} from "./components/logo/logo.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        InputComponent,
        CallbackComponent,
        FooterComponent,
        LogoComponent,
    ],
    imports: [
        LoginRoutingModule,
        SharedModule,
    ]
})
export class LoginModule {
}
