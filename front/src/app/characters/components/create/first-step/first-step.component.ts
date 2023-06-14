import {Component, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Village from "../../../../app/models/village.model";
import Environment from "../../../../../environments/environment.interface";
import Clan from "../../../../app/models/clan.model";

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  village: Village = this.dataService.villages.getValue()[0];
  firstName?: string;
  clan?: Clan;
  rank: string = this.dataService.ranks.getValue()[0];

  constructor(private creationService: CreationService, private router: Router, public dataService: DataService, private env: Environment) { }

  ngOnInit(): void {
    if (this.creationService.step !== 1) {
      this.router.navigate(['/personnages/creation/' + this.creationService.step]);
    }
  }

  currentVillageLogo() {
    return this.env.api_url + '/assets/villages/' + this.village.logo;
  }

  currentClanLogo() {
    return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name + '.svg' : '';
  }
}
