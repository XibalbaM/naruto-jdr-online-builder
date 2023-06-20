import {Component, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Village from "../../../../app/models/village.model";
import Environment from "../../../../../environments/environment.interface";
import Clan from "../../../../app/models/clan.model";
import Character from "../../../../app/models/character.model";
import Road from "../../../../app/models/road.model";

@Component({
    selector: 'app-first-step',
    templateUrl: './first-step.component.html',
    styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

    village: Village = this.dataService.villages.getValue()[0];
    firstName?: string;
    clan?: Clan;
    xp: number = 100;
    isRoad: boolean = false;
    road?: Road;

    constructor(private creationService: CreationService, private router: Router, public dataService: DataService, private env: Environment) {
    }

    ngOnInit(): void {
        if (this.creationService.step !== 1) {
            this.router.navigate(['/characters/create/' + this.creationService.step]);
        } else {
            this.creationService.character = new Character();
        }
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.logo;
    }

    currentClanLogo() {
        return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name + '.svg' : '';
    }

    submit() {

        if (this.firstName && this.clan && (!this.isRoad || this.road)) {
            this.creationService.stepOne(this.village, this.firstName, this.clan, this.xp, this.road);
            this.router.navigate(['/characters/create/' + this.creationService.step]);
        }
    }
}
