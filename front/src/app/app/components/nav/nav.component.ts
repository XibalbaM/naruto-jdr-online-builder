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

  accountUrl: BehaviorSubject<string> = new BehaviorSubject<string>('/connexion');
  onAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onCreate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public auth: Auth, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.onCreate.next(this.router.url.startsWith('/creation'));
      this.onList.next(this.router.url.startsWith('/liste'));
      this.onAccount.next(this.router.url.startsWith(this.accountUrl.getValue()));
    });
    this.auth.tokenObservable().subscribe((token) => {
      if (token) {
        this.accountUrl.next("/compte");
      } else {
        this.accountUrl.next("/connexion");
      }
    });
  }
}
