import {Component, computed, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Village from "../../../../app/models/village.model";
import Environment from "../../../../../environments/environment.interface";
import Clan from "../../../../app/models/clan.model";
import Road from "../../../../app/models/road.model";
import {IdToDataPipe} from "../../../../utils/pipes/id-to-data.pipe";
import {XpToRankPipe} from '../../../../utils/pipes/xp-to-rank.pipe';
import {LongArrowRightComponent} from '../../../../utils/components/long-arrow-right/long-arrow-right.component';
import {SpacerComponent} from '../../../../utils/components/spacer/spacer.component';
import {AsyncPipe, NgFor, NgIf, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-first-step',
    templateUrl: './first-step.component.html',
    styleUrls: ['./first-step.component.scss'],
    standalone: true,
    imports: [FormsModule, NgFor, SpacerComponent, NgIf, LongArrowRightComponent, AsyncPipe, TitleCasePipe, XpToRankPipe]
})
export class FirstStepComponent implements OnInit {

    village: Village = this.idToData.transform(this.creationService.character.village, this.dataService.villages) || this.dataService.villages.find(village => village.name === "Konoha")!;
    firstName?: string = this.creationService.character.firstName;
    clan?: Clan = this.idToData.transform(this.creationService.character.clan, this.dataService.clans);
    xp: number = this.creationService.character.xp || 100;
    isRoad: boolean = !!this.creationService.character.road;
    road?: Road = this.creationService.character.road ? this.idToData.transform(this.creationService.character.road, this.dataService.roads) : undefined;
    clans = computed(() => this.dataService.clans.sort((a, b) => a.name.localeCompare(b.name)));

    constructor(private creationService: CreationService, private router: Router, public dataService: DataService, private env: Environment, private idToData: IdToDataPipe) {
    }

    ngOnInit(): void {
        if (this.creationService.step !== 1) {
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        }
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.name.toLowerCase() + '-yellow.svg';
    }

    currentClanLogo() {
        return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name.toLowerCase() + '-white.svg' : '';
    }

    submit() {

        if (this.firstName && this.clan && (!this.isRoad || this.road)) {
            this.creationService.stepOne(this.village, this.firstName, this.clan, this.xp, this.road);
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        }
    }
}
