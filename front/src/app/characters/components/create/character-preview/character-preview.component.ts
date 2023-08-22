import {Component, Input} from '@angular/core';
import Character from "../../../../app/models/character.model";
import Environment from "../../../../../environments/environment.interface";
import {DataService} from "../../../../app/services/data.service";

@Component({
	selector: 'app-character-preview',
	templateUrl: './character-preview.component.html',
	styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent {

	@Input() character!: Character;

	constructor(protected env: Environment, protected dataService: DataService) {
	}
}
