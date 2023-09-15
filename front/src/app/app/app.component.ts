import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    $navbarType: BehaviorSubject<"default" | "character" | "characterWithNav" | "none"> = new BehaviorSubject<"default" | "character" | "characterWithNav" | "none">("default");
    $currentRoute: BehaviorSubject<ActivatedRouteSnapshot> = new BehaviorSubject<ActivatedRouteSnapshot>(new ActivatedRouteSnapshot());
    $bgMethode: BehaviorSubject<'none' | 'image' | 'imageNoRepeat'> = new BehaviorSubject<'none' | 'image' | 'imageNoRepeat'>('none');
    @ViewChild("scrollHolder") scrollHolder!: ElementRef<HTMLDivElement>;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe(() => {
            let currentRoute = this.router.routerState.snapshot.root;
            while (currentRoute.firstChild) {
                currentRoute = currentRoute.firstChild;
            }
            this.$navbarType.next(currentRoute.data['navbar'] || "default");
            this.$bgMethode.next(currentRoute.data['bgMethode'] || 'none');
            this.$currentRoute.next(currentRoute);
            this.scrollHolder.nativeElement.scrollTop = 0;
        });
    }
}
