import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";
import {take} from "rxjs";
import {PredrawnService} from "../../../app/services/predrawn.service";

@Component({
  template: '',
  standalone: true
})
export class AddPredrawnAction implements OnInit {

    constructor(private activeRoute: ActivatedRoute, private router: Router, private notificationService: NotificationService,
                private predrawnService: PredrawnService) {
    }

    ngOnInit() {
        this.activeRoute.paramMap.pipe(take(1)).subscribe((params) => {
            this.predrawnService.addPredrawnCharacter(params.get('predrawnId')!).subscribe(({success, id}) => {
                if (success) {//TODO update cache
                    this.notificationService.showNotification("Succès", "Le personnage a été ajouté aux prétirés avec succès.");
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de l'ajout du personnage aux prétirés.");
                }
            });
            this.router.navigateByUrl("/admin/pretires");
        });
    }
}
