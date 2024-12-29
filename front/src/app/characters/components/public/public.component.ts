import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import Character, {SharedCharacter} from "../../../app/models/character.interface";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {PublicCharacterListComponent} from "../public-character-list/public-character-list.component";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-public',
  standalone: true,
    imports: [
        FormsModule,
        PublicCharacterListComponent
    ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {

    characters = signal<SharedCharacter[]>([])

    constructor(protected auth: Auth, protected characterService: CharacterService, protected dataService: DataService) {
    }

    ngOnInit() {
        this.characterService.getPublicCharacters().subscribe((characters) => {
            this.characters.set(characters);
        });
    }
}
