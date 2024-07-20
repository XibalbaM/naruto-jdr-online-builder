import {Component, computed, effect, Injector, OnInit, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {AdminLogoComponent} from '../../../utils/components/admin-logo/admin-logo.component';
import {ActivatedRoute, Router} from "@angular/router";
import AdminService from "../../services/admin.service";
import User from "../../../app/models/user.interface";
import {zip} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: true,
    imports: [AdminLogoComponent, SpacerComponent, HomeButtonComponent, FormsModule, NgIf, NgOptimizedImage, NgForOf]
})
export class UserComponent implements OnInit {

    user = signal<User | undefined>(undefined);
    isActive = computed(() => this.user()?.lastActivity?.getTime() || 0 > Date.now() - 60*60*24*7);

    constructor(private auth: Auth, private injector: Injector, private router: Router, private activatedRoute: ActivatedRoute,
                protected adminService: AdminService) {
        effect(() => {
            console.log(this.user());
        });
    }

    ngOnInit() {
        zip(this.auth.userObservableOnceLoaded(this.injector), this.adminService.getAllUsers(), this.activatedRoute.paramMap)
            .subscribe(([user, users, params]) => {
            if (user.isAdmin && params.has('id')) {
                this.user.set(users.find(u => u._id === params.get('id')));
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}