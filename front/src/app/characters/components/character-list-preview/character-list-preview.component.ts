import {Component, Input} from '@angular/core';
import Character from "../../../app/models/character.model";
import Environment from "../../../../environments/environment.interface";
import {DataService} from "../../../app/services/data.service";

@Component({
    selector: 'app-character-list-preview',
    templateUrl: './character-list-preview.component.html',
    styleUrls: ['./character-list-preview.component.scss']
})
export class CharacterListPreviewComponent {

    @Input() character!: Character;

    constructor(protected env: Environment, protected dataService: DataService) {
    }

    protected readonly Math = Math;
}
