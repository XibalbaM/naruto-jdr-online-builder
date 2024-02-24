import {Component} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {SpacerComponent} from '../../../shared/components/spacer/spacer.component';
import {PlusSymbolComponent} from '../../../shared/components/plus-symbol/plus-symbol.component';
import {CharacterListPreviewComponent} from '../character-list-preview/character-list-preview.component';
import {AsyncPipe, NgFor} from '@angular/common';
import {SpacerGraphicalComponent} from '../../../shared/components/spacer-graphical/spacer-graphical.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [RouterLink, SpacerGraphicalComponent, NgFor, CharacterListPreviewComponent, PlusSymbolComponent, SpacerComponent, AsyncPipe]
})
export class ListComponent {

    constructor(protected auth: Auth) {
    }
}
