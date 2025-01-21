import {Component, computed, OnInit} from '@angular/core';
import {CreationService} from "../../../services/creation.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../app/services/data.service";
import Village from "../../../../app/models/village.interface";
import Environment from "../../../../../environments/environment.interface";
import Road from "../../../../app/models/road.interface";
import {IdToDataPipe} from "../../../../utils/pipes/id-to-data.pipe";
import {XpToRankPipe} from '../../../../utils/pipes/xp-to-rank.pipe';
import {LongArrowRightComponent} from '../../../../utils/components/long-arrow-right/long-arrow-right.component';
import {SpacerComponent} from '../../../../utils/components/spacer/spacer.component';
import {NgFor, NgIf, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PrivacySelectorComponent} from "../../../../utils/components/privacy-selector/privacy-selector.component";
import {ImageFallbackDirective} from "../../../../utils/directives/image-fallback.directive";

@Component({
    selector: 'app-first-step',
    templateUrl: './first-step.component.html',
    styleUrls: ['./first-step.component.scss'],
    standalone: true,
    imports: [FormsModule, NgFor, SpacerComponent, NgIf, LongArrowRightComponent, TitleCasePipe, XpToRankPipe, NgOptimizedImage, PrivacySelectorComponent, ImageFallbackDirective]
})
export class FirstStepComponent implements OnInit {

    village: Village = this.idToData.transform(this.creationService.character.village, this.dataService.villages) || this.dataService.villages.find(village => village.name === "Konoha")!;
    firstName?: string = this.creationService.character.firstName;
    clanId?: string = this.creationService.character.clan?.id;
    clanName?: string = this.creationService.character.clan?.clanName;
    xp: number = this.creationService.character.xp || 100;
    isRoad: boolean = !!this.creationService.character.road;
    shareStatus: "private" | "not-referenced" | "public" = this.creationService.character.shareStatus || "private" as any;
    road?: Road = this.creationService.character.road ? this.idToData.transform(this.creationService.character.road, this.dataService.roads) : undefined;
    clans = computed(() => [...this.dataService.clans.sort((a, b) => a.name.localeCompare(b.name)), {_id: "custom", name: "custom"}]);

    constructor(private creationService: CreationService, private router: Router, public dataService: DataService, protected env: Environment, private idToData: IdToDataPipe) {
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
        return this.clanId ? this.env.api_url + '/assets/clans/' + this.idToData.transform(this.clanId, this.dataService.clans)?.name?.toLowerCase() + '-white.svg' : '';
    }

    submit() {
        if (this.firstName && this.clanId && !(this.clanId == "custom" && !this.clanName) && (!this.isRoad || this.road)) {
            this.creationService.stepOne(this.village, this.firstName, {id: this.clanId, clanName: this.clanName}, this.xp, this.shareStatus, this.road);
            this.router.navigate(['/personnages/creation/' + this.creationService.step]);
        }
    }
}
