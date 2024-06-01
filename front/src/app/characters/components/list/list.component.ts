import {Component, computed, effect} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {PlusSymbolComponent} from '../../../utils/components/plus-symbol/plus-symbol.component';
import {CharacterListPreviewComponent} from '../character-list-preview/character-list-preview.component';
import {AsyncPipe, NgFor} from '@angular/common';
import {SpacerGraphicalComponent} from '../../../utils/components/spacer-graphical/spacer-graphical.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [RouterLink, SpacerGraphicalComponent, NgFor, CharacterListPreviewComponent, PlusSymbolComponent, SpacerComponent, AsyncPipe]
})
export class ListComponent {

    characters = computed(() => this.auth.userSignal()()?.characters.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1))

    constructor(private auth: Auth) {
        effect(() => {
            console.log(this.characters());
        });
    }
}
