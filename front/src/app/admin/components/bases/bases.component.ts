import {Component, Injector} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {Router, RouterLink} from "@angular/router";
import {DataService} from "../../../app/services/data.service";
import {NgForOf} from "@angular/common";
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";

@Component({
  selector: 'app-bases',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        ArrowRightComponent
    ],
  templateUrl: './bases.component.html',
  styleUrl: './bases.component.scss'
})
export class BasesComponent {

    constructor(private auth: Auth, private injector: Injector, private router: Router,
                protected dataService: DataService) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe((user) => {
            if (!user.isAdmin) {
                this.router.navigate(['/']);
            }
        });
    }
}
