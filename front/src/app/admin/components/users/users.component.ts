import {Component, computed, Injector, OnInit, signal, WritableSignal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {AdminLogoComponent} from '../../../utils/components/admin-logo/admin-logo.component';
import {Router, RouterLink} from "@angular/router";
import AdminService from "../../services/admin.service";
import User from "../../../app/models/user.interface";
import {zip} from "rxjs";
import {BgComponent} from "../../../utils/components/bg/bg.component";
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";
import {UsersDateGroupPipe} from "../../pipes/characters-date-group.pipe";

@Component({
    selector: 'app-home',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [AdminLogoComponent, SpacerComponent, HomeButtonComponent, FormsModule, NgIf, NgOptimizedImage, NgForOf, RouterLink, BgComponent, ArrowRightComponent, DatePipe, UsersDateGroupPipe, TitleCasePipe]
})
export class UsersComponent implements OnInit {

    filter: WritableSignal<"Tous" | "Actifs" | "Inactifs"> = signal("Tous");

    users = signal<User[]>([])
    search = signal<string>('')
    filteredUsers = computed(() =>
        this.users().filter(user => user.email.includes(this.search()) || user.username?.includes(this.search())).filter(user => {
            if (this.filter() === "Tous") {
                return true;
            } else if (this.filter() === "Actifs") {
                return new Date(user.lastActivity).getTime() > Date.now() - 60*60*24*7*1000;
            } else if (this.filter() === "Inactifs") {
                return new Date(user.lastActivity).getTime() < Date.now() - 60*60*24*7*1000;
            }
            return true;
        })
    )

    constructor(private auth: Auth, private injector: Injector, private router: Router,
                protected adminService: AdminService) {
    }

    ngOnInit() {
        zip(this.auth.userObservableOnceLoaded(this.injector), this.adminService.getAllUsers()).subscribe(([user, users]) => {
            if (user.isAdmin) {
                this.users.set(users);
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}