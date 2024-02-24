import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../app/services/data.service";
import Auth from "../../../app/models/auth.model";
import Character from "../../../app/models/character.model";
import {PredrawnService} from "../../../app/services/predrawn.service";
import {BehaviorSubject, zip} from "rxjs";
import {NotificationService} from "../../../app/services/notification.service";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { SpacerComponent } from '../../../shared/components/spacer/spacer.component';
import { AdminLogoComponent } from '../../../shared/components/admin-logo/admin-logo.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [AdminLogoComponent, SpacerComponent, HomeButtonComponent, FormsModule, NgIf]
})
export class HomeComponent implements OnInit {

    $characters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
    $predrawnCharacters: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
    characterToChange?: Character;
    readonly = false;

    constructor(private predrawnService: PredrawnService, private auth: Auth, protected dataService: DataService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        zip(this.auth.userObservableOnceLoaded(), this.predrawnService.getPredrawnCharacters()).subscribe(([user, predrawnCharacters]) => {
            this.$characters.next(user.characters);
            this.$predrawnCharacters.next(predrawnCharacters);
        });
    }

    add() {
        if (this.characterToChange) {
            this.predrawnService.addPredrawnCharacter(this.characterToChange._id).subscribe(({success, id}) => {
                if (success) {
                    const character = JSON.parse(JSON.stringify(this.$characters.getValue().find((character) => character._id === this.characterToChange!._id)!));
                    character._id = id!;
                    this.$predrawnCharacters.next([...this.$predrawnCharacters.getValue(), character]);
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de l'ajout du personnage");
                }
            });
        }
    }

    remove() {
        if (this.characterToChange) {
            this.predrawnService.removePredrawnCharacter(this.characterToChange._id).subscribe((success) => {
                if (success) {
                    this.$predrawnCharacters.next(this.$predrawnCharacters.getValue().filter((character) => character._id !== this.characterToChange!._id));
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la suppression du personnage");
                }
            });
        }
    }
}