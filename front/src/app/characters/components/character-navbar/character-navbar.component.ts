import {Component, inject} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Character from "../../../app/models/character.model";
import Auth from "../../../app/models/auth.model";
import {NAVBAR_DATA_TOKEN} from "../../../app/app.component";
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";
import {CharacterService} from "../../services/character.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";

@Component({
  selector: 'app-character-navbar',
  templateUrl: './character-navbar.component.html',
  styleUrls: ['./character-navbar.component.scss']
})
export class CharacterNavbarComponent {

    $character = new BehaviorSubject<Character>(new Character());
    navbarData = inject(NAVBAR_DATA_TOKEN);
    deleteNameConfirm = ""

    constructor(private auth: Auth, protected dataService: DataService, private idToData: IdToDataPipe,
                private characterService: CharacterService, private router: Router, private notificationService: NotificationService) {
    }

    ngOnInit() {
        const id = this.navbarData?.currentRoute.params["characterId"];
        this.auth.userObservableOnceLoaded().subscribe(user => {
            if (id && user.characters.find(character => character._id === id)) {
                this.$character.next(user.characters.find(character => character._id === id)!);
            }
        });
    }

    copyCharacter() {
        this.characterService.copyCharacter(this.$character.getValue()._id).subscribe(({success, character}) => {
            if (success) {
                this.notificationService.showNotification("Copie du personnage", "Le personnage a été copié avec succès, vous avez été redirigé vers la page du nouveau personnage");
                this.router.navigate(['/personnages', character!._id]);
            } else {
                this.notificationService.showNotification("Copie du personnage", "Une erreur est survenue lors de la copie du personnage");
            }
        });
    }

    deleteCharacter() {
        const name = (this.$character.getValue().firstName + ' ' + this.idToData.transform(this.$character.getValue().clan, this.dataService.clans.getValue())?.name)
        if (this.deleteNameConfirm.toLowerCase() === name.toLowerCase()) {
            this.characterService.deleteCharacter(this.$character.getValue()._id).subscribe((success) => {
                if (success) {
                    this.notificationService.showNotification("Suppression du personnage", name + " a été supprimé avec succès");
                    this.router.navigate(['/personnages']);
                } else {
                    this.notificationService.showNotification("Suppression du personnage", "Une erreur est survenue lors de la suppression de " + name);
                }
            })
        }
    }

    protected readonly Math = Math;
    protected readonly NgxPopperjsTriggers = NgxPopperjsTriggers;
    protected readonly NgxPopperjsPlacements = NgxPopperjsPlacements;
}