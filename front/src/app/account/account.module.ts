import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AccountRoutingModule} from "./account-routing.module";
import {EditComponent} from "./components/edit/edit.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    EditComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ],
})
export class AccountModule {
}
