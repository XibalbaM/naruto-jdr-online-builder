import {Component, Injector, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router} from "@angular/router";
import AdminService from "../../services/admin.service";
import {NotificationService} from "../../../app/services/notification.service";
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import {DataService} from "../../../app/services/data.service";
import {AutosizeModule} from "ngx-autosize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BackNavbarService} from "../../../app/services/back-navbar.service";

let baseTextTemp: Map<number, string> = new Map<number, string>();

@Component({
    selector: 'app-base',
    standalone: true,
    imports: [
        AutosizeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './base.component.html',
    styleUrl: './base.component.scss'
})
export class BaseComponent {

    base = signal<Base>(this.dataService.bases[0]);
    text = signal('');

    constructor(private auth: Auth, private injector: Injector, private router: Router, private dataService: DataService,
                protected adminService: AdminService, protected notificationService: NotificationService, private activatedRoute: ActivatedRoute,
                private backNavbarService: BackNavbarService) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe((user) => {
            let base = this.dataService.bases[Number(this.activatedRoute.snapshot.paramMap.get('id'))];
            if (user.isAdmin && base) {
                this.base.set(base);
                if (baseTextTemp.has(base._id))
                    this.text.set(baseTextTemp.get(base._id)!);
                else
                    this.text.set(base.description);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    submit() {
        if (!this.adminService.readonlyMode() && this.base().description !== this.text()) {
            this.adminService.updateBase(this.base()._id, this.text()).subscribe((success) => {
                if (success) {
                    this.notificationService.showNotification("Description modifiée", `La description de la base ${this.base().shortName} a été modifiée avec succès`);
                    this.base().description = this.text();
                } else {
                    this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la modification de la description de la base");
                }
            });
        }
    }

    goBack() {
        baseTextTemp.delete(this.base()._id);
        this.router.navigate(["/admin/bases"]);
    }

    goToFormatHelp() {
        baseTextTemp.set(this.base()._id, this.text());
        this.backNavbarService.backUrl = this.router.url;
        this.backNavbarService.text = "Notes"
        this.router.navigate(['/mise-en-forme']);
    }
}