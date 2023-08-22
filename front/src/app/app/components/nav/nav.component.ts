import {Component, Input, OnInit} from "@angular/core";
import Auth from "../../models/auth.model";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {BehaviorSubject, combineLatest} from "rxjs";
import Character from "../../models/character.model";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    onAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onCreate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Input() $type!: BehaviorSubject<"default" | "character" | "characterWithNav" | "none">;
    @Input() $currentRoute!: BehaviorSubject<ActivatedRouteSnapshot>;
    $character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());
    $user = this.auth.userObservableOnceLoaded();

    constructor(protected auth: Auth, private router: Router, private idToData: IdToDataPipe) {
    }

    ngOnInit() {
        combineLatest([this.$currentRoute, this.auth.userObservableOnceLoaded()]).subscribe(([route, user]) => {
            this.onCreate.next(this.router.url.startsWith('/personnages/creation'));
            this.onList.next(!!this.router.url.match(/^\/personnages(?!\/creation\/).*$/));
            this.onAccount.next(this.router.url.startsWith("/compte"));
            this.onAdmin.next(this.router.url.startsWith("/admin"));
            if ((this.$type.value === "character" || this.$type.value === "characterWithNav") && route.params["characterId"]) {
                this.$character.next(this.idToData.transform(route.params["characterId"], user.characters || [])!);
            }
        });
    }

    protected readonly Math = Math;
}
