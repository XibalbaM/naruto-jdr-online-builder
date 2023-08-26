import {Component, OnInit} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {PredrawnService} from "../../../app/services/predrawn.service";
import Character from "../../../app/models/character.model";
import {DataService} from "../../../app/services/data.service";

@Component({
    selector: 'app-predrawn',
    templateUrl: './predrawn.component.html',
    styleUrls: ['./predrawn.component.scss']
})
export class PredrawnComponent implements OnInit {

    characters?: Character[];
    characterToAdd?: Character;

    constructor(protected auth: Auth, protected predrawnService: PredrawnService, protected dataService: DataService) {}

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((characters) => {
            this.characters = characters;
        });
    }

    takePredrawn(character: string) {
        this.predrawnService.takePredrawnCharacter(character);
    }
}