import {Component, Input} from '@angular/core';
import Character from "../../../app/models/character.model";
import Environment from "../../../../environments/environment.interface";
import {DataService} from "../../../app/services/data.service";
import {CharacterToReamingXpPipe} from '../../../shared/pipes/character-to-reaming-xp.pipe';
import {IdToDataPipe} from '../../../shared/pipes/id-to-data.pipe';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';

@Component({
    selector: 'app-character-list-preview',
    templateUrl: './character-list-preview.component.html',
    styleUrls: ['./character-list-preview.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgClass, AsyncPipe, IdToDataPipe, CharacterToReamingXpPipe]
})
export class CharacterListPreviewComponent {

    @Input() character!: Character;
    protected readonly Math = Math;

    constructor(protected env: Environment, protected dataService: DataService) {
    }
}
