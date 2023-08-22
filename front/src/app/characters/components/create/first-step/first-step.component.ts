import {Component, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Village from "../../../../app/models/village.model";
import Environment from "../../../../../environments/environment.interface";
import Clan from "../../../../app/models/clan.model";
import Character from "../../../../app/models/character.model";
import Road from "../../../../app/models/road.model";
import {IdToDataPipe} from "../../../../shared/pipes/id-to-data.pipe";

@Component({
    selector: 'app-first-step',
    templateUrl: './first-step.component.html',
    styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

    village: Village = this.idToData.transform(this.creationService.character.village, this.dataService.villages.getValue()) || this.dataService.villages.getValue().find(village => village.name === "Konoha")!;
    firstName?: string = this.creationService.character.firstName;
    clan?: Clan = this.idToData.transform(this.creationService.character.clan, this.dataService.clans.getValue());
    xp: number = this.creationService.character.xp || 100;
    isRoad: boolean = !!this.creationService.character.road;
    road?: Road = this.creationService.character.road ? this.idToData.transform(this.creationService.character.road, this.dataService.roads.getValue()) : undefined;

    constructor(private creationService: CreationService, private router: Router, public dataService: DataService, private env: Environment, private idToData: IdToDataPipe) {
    }

    ngOnInit(): void {
        if (this.creationService.step !== 1) {
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        } else {
            this.creationService.character = new Character();
        }
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.name + '-yellow.svg';
    }

    currentClanLogo() {
        return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name + '-white.svg' : '';
    }

    submit() {

        if (this.firstName && this.clan && (!this.isRoad || this.road)) {
            this.creationService.stepOne(this.village, this.firstName, this.clan, this.xp, this.road);
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        }
    }
}
