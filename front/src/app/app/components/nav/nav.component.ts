import {Component, OnInit} from "@angular/core";
import Auth from "../../models/auth.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  onAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onCreate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(protected auth: Auth, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.onCreate.next(this.router.url.startsWith('/personnages/creation'));
      this.onList.next(!!this.router.url.match(/^\/personnages(?!\/creation\/).*$/));
      this.onAccount.next(this.router.url.startsWith("/compte"));
    });
  }
}
