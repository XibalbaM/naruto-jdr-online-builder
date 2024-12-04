import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";
import {take} from "rxjs";
import {PredrawnService} from "../../../app/services/predrawn.service";
import Auth from "../../../app/models/auth.model";

@Component({
  template: '',
  standalone: true
})
export class AddPredrawnAction implements OnInit {

    constructor(private activeRoute: ActivatedRoute, private router: Router, private notificationService: NotificationService,
                private predrawnService: PredrawnService, private auth: Auth) {
    }

    ngOnInit() {
        this.activeRoute.paramMap.pipe(take(1)).subscribe((params) => {
            this.predrawnService.addPredrawnCharacter(params.get('predrawnId')!).subscribe(({success, id}) => {
                if (success) {//TODO update cache
                    this.auth.user?.characters.push({
                        ...this.auth.user?.characters.find((character) => character._id === params.get('predrawnId'))!,
                        _id: id!
                    });
                    this.notificationService.showNotification("Succès", "Le personnage a été ajouté aux prétirés avec succès.");
                    this.router.navigateByUrl("/admin/pretires");
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de l'ajout du personnage aux prétirés.");
                }
            });
        });
    }
}
