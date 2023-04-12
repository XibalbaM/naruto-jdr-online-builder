import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";

import {LoginRoutingModule} from "./login-routing.module";
import {InputComponent} from "./components/input/input.component";
import {CallbackComponent} from "./components/callback/callback.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LogoComponent} from "./components/logo/logo.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    InputComponent,
    CallbackComponent,
    FooterComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
  ],
})
export class LoginModule {
}
