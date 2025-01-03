import {Component, inject, signal} from '@angular/core';
import {NAVBAR_DATA_TOKEN} from "../../../app/app.component";
import {NgxPopperjsContentComponent, NgxPopperjsDirective, NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {CharacterService} from "../../services/character.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";
import {CharacterToReamingXpPipe} from '../../../utils/pipes/character-to-reaming-xp.pipe';
import {LongArrowLeftComponent} from '../../../utils/components/long-arrow-left/long-arrow-left.component';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from '../../../utils/components/modal/modal.component';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import Character from "../../../app/models/character.interface";
import {Observable} from "rxjs";
import Auth from "../../../app/models/auth.model";

@Component({
    selector: 'app-character-navbar',
    templateUrl: './character-navbar.component.html',
    styleUrls: ['./character-navbar.component.scss'],
    standalone: true,
    imports: [NgxPopperjsContentComponent, RouterLink, NgIf, SpacerComponent, ModalComponent, FormsModule, LongArrowLeftComponent, NgClass, NgxPopperjsDirective, RouterLinkActive, IdToDataPipe, CharacterToReamingXpPipe, NgOptimizedImage]
})
export class CharacterNavbarComponent {

    isEditable = signal(false);
    character = signal({} as Character);
    navbarData = inject(NAVBAR_DATA_TOKEN);
    deleteNameConfirm = ""
    isShiftPressed = signal(false);
    protected readonly Math = Math;
    protected readonly NgxPopperjsTriggers = NgxPopperjsTriggers;
    protected readonly NgxPopperjsPlacements = NgxPopperjsPlacements;

    constructor(protected dataService: DataService, private idToData: IdToDataPipe, private characterService: CharacterService,
                private router: Router, private notificationService: NotificationService, protected auth: Auth) {
    }

    ngOnInit() {
        const id = this.navbarData?.currentRoute.params["characterId"];
        if (id) {
            let {character, editable} = this.characterService.resolveCharacter(id);
            this.isEditable.set(editable);
            if (editable) {
                this.character.set(character as Character);
            } else {
                (character as Observable<Character>).subscribe((character) => {
                    if (character) {
                        this.character.set(character);
                    } else {
                        this.router.navigate(['/personnages']);
                    }
                });
            }
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Shift') {
                this.isShiftPressed.set(true);
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.isShiftPressed.set(false);
            }
        });
    }

    copyCharacter() {
        this.characterService.copyCharacter(this.character()._id).subscribe(({success, character}) => {
            if (success) {
                this.notificationService.showNotification("Copie du personnage", "Le personnage a été copié avec succès, vous avez été redirigé vers la page du nouveau personnage");
                this.router.navigate(['/personnages', character!._id]);
            } else {
                this.notificationService.showNotification("Copie du personnage", "Une erreur est survenue lors de la copie du personnage");
            }
        });
    }

    exportCharacter() {
        const characterJSON = JSON.stringify(this.character());
        const blob = new Blob([characterJSON], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.character().firstName + '.json';
        a.click();
    }

    deleteCharacter(skipConfirmation = false) {
        if (!this.isEditable())
            return;
        const name = (this.character().firstName + ' ' + this.idToData.transform(this.character().clan, this.dataService.clans)?.name)
        if (skipConfirmation || this.deleteNameConfirm.toLowerCase().replace("ō", "o").replace("ū", "u") === name.toLowerCase().replace("ō", "o").replace("ū", "u")) {
            this.characterService.deleteCharacter(this.character()._id).subscribe((success) => {
                if (success) {
                    this.notificationService.showNotification("Suppression du personnage", name + " a été supprimé avec succès");
                    this.router.navigate(['/personnages']);
                } else {
                    this.notificationService.showNotification("Suppression du personnage", "Une erreur est survenue lors de la suppression de " + name);
                }
            })
        }
    }
}