import {Component, ElementRef, inject, InjectionToken, Injector, OnInit, signal, ViewChild} from "@angular/core";
import {ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {NotificationComponent} from "./components/notification/notification.component";
import {AsyncPipe, NgClass, NgComponentOutlet} from "@angular/common";

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
    navbar = signal<any>(null);
    navbarDataInjector = signal(this.createNavbarDataInjector(null));
    bgClass = signal('');
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
            this.navbar.set(currentRoute.data['navbar'] || null);
            this.bgClass.set(currentRoute.data['bgClass'] || '');
            this.navbarDataInjector.set(this.createNavbarDataInjector(new NavbarData(currentRoute)));
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