import {Component, inject} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Character from "../../../app/models/character.model";
import Auth from "../../../app/models/auth.model";
import {Router} from "@angular/router";
import {NAVBAR_DATA_TOKEN} from "../../../app/app.component";

@Component({
  selector: 'app-character-navbar',
  templateUrl: './character-navbar.component.html',
  styleUrls: ['./character-navbar.component.scss']
})
export class CharacterNavbarComponent {

    $character = new BehaviorSubject<Character>(new Character());
    navbarData = inject(NAVBAR_DATA_TOKEN);

    constructor(private auth: Auth) {
    }

    ngOnInit() {
        const id = this.navbarData?.currentRoute.params["characterId"];
        this.auth.userObservableOnceLoaded().subscribe(user => {
            if (id && user.characters.find(character => character._id === id)) {
                this.$character.next(user.characters.find(character => character._id === id)!);
            }
        });
    }

    protected readonly Math = Math;
}