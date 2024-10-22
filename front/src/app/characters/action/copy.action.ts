import {Component, OnInit} from "@angular/core";
import {take} from "rxjs";
import {CharacterService} from "../services/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../app/services/notification.service";

@Component({
    template: '',
    standalone: true
})
export class CopyAction implements OnInit {

    constructor(private activeRoute: ActivatedRoute, private characterService: CharacterService, private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.activeRoute.paramMap.pipe(take(1)).subscribe((params) => {
            this.characterService.copyCharacter(params.get('characterId')!).subscribe(({character, success}) => {
                if (success) {
                    this.notificationService.showNotification("Succès", "Le personnage a été copié avec succès.");
                    this.router.navigateByUrl("/personnages/" + character!._id);
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la copie du personnage.");
                    this.router.navigateByUrl("/personnages");
                }
            });
        });
    }
}