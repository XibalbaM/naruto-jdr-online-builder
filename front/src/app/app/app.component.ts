import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "naruto-jdr-online-builder";
  showNav: boolean = true;
  imageBg: boolean = false;
  private readonly imageBgPages: string[] = [
    "/connexion",
    "/",
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNav = !this.router.url.includes("/connexion");
      this.imageBg = this.imageBgPages.includes(this.router.url);
    });
  }
}
