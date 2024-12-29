import {Component, OnInit, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {FormsModule} from "@angular/forms";
import {SharedCharacter} from "../../../app/models/character.interface";
import {PredrawnService} from "../../../app/services/predrawn.service";
import {PublicCharacterListComponent} from "../public-character-list/public-character-list.component";

@Component({
    selector: 'app-predrawn',
    templateUrl: './predrawn.component.html',
    styleUrls: ['./predrawn.component.scss'],
    standalone: true,
    imports: [FormsModule, PublicCharacterListComponent]
})
export class PredrawnComponent implements OnInit {

    predrawns = signal<SharedCharacter[]>([])

    constructor(protected auth: Auth, protected predrawnService: PredrawnService, protected dataService: DataService) {
    }

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((characters) => {
            this.predrawns.set(characters);
        });
    }
}