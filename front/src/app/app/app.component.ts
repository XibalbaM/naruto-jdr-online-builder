import {Component, ElementRef, inject, InjectionToken, Injector, OnInit, ViewChild} from "@angular/core";
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";
import { NotificationComponent } from "./components/notification/notification.component";
import { NgComponentOutlet, NgClass, AsyncPipe } from "@angular/common";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true,
    imports: [
        NgComponentOutlet,
        NotificationComponent,
        NgClass,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class AppComponent implements OnInit {
    $navbar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    $navbarDataInjector: BehaviorSubject<Injector> = new BehaviorSubject<Injector>(this.createNavbarDataInjector(null));
    $bgClass: BehaviorSubject<string> = new BehaviorSubject<string>('');
    @ViewChild("scrollHolder") scrollHolder!: ElementRef<HTMLDivElement>;

    private readonly injector = inject(Injector);

    constructor(protected router: Router) {
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe(() => {
            let currentRoute = this.router.routerState.snapshot.root;
            while (currentRoute.firstChild) {
                currentRoute = currentRoute.firstChild;
            }
            this.$navbar.next(currentRoute.data['navbar'] || null);
            this.$bgClass.next(currentRoute.data['bgClass'] || '');
            this.$navbarDataInjector.next(this.createNavbarDataInjector(new NavbarData(currentRoute)));
            this.scrollHolder.nativeElement.scrollTop = 0;
        });
    }

    private createNavbarDataInjector(navbarData: NavbarData | null) {
        return Injector.create({
            parent: this.injector,
            providers: [
                {provide: NAVBAR_DATA_TOKEN, useValue: navbarData}
            ]
        })
    }
}

export class NavbarData {

    constructor(public currentRoute: ActivatedRouteSnapshot) {
    }
}

export const NAVBAR_DATA_TOKEN = new InjectionToken<NavbarData | null>("navbarData");