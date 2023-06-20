import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SpacerGraphicalComponent} from './components/spacer-graphical/spacer-graphical.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {RolesPipe} from "./pipes/roles.pipe";
import {RoleNamePipe} from './pipes/role-name.pipe';
import {XpToRankPipe} from './pipes/xp-to-rank.pipe';

@NgModule({
    declarations: [
        SpacerGraphicalComponent,
        SpacerComponent,
        RolesPipe,
        RoleNamePipe,
        XpToRankPipe
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
    ],
    exports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        SpacerGraphicalComponent,
        SpacerComponent,
        RolesPipe,
        RoleNamePipe,
        XpToRankPipe,
    ],
    providers: [
        RoleNamePipe,
        XpToRankPipe
    ]
})
export class SharedModule {
}
