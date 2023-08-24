import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {combineLatest, map, Observable} from "rxjs";
import Character from "../../../app/models/character.model";
import Village from "../../../app/models/village.model";
import Clan from "../../../app/models/clan.model";
import Road from "../../../app/models/road.model";
import Environment from "../../../../environments/environment.interface";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Rank from "../../../app/models/rank.model";

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {
    character!: Character;
    village!: Village;
    firstName!: string;
    clan!: Clan;
    xp!: number;
    isRoad!: boolean;
    road?: Road;
    rank!: Rank;
    $clans = this.dataService.clans.pipe(
        map((clans) => {
            return clans.sort((a, b) => a.name.localeCompare(b.name))
        })
    );

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth,
                protected dataService: DataService, private env: Environment, private idToData: IdToDataPipe,
                private characterService: CharacterService, private notificationService: NotificationService) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded()]).subscribe(([params, user]) => {
            if (params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId'))) {
                this.character = (user.characters.find((character) => character._id === params.get('characterId'))!);
                this.village = this.idToData.transform(this.character.village, this.dataService.villages.getValue())!;
                this.firstName = this.character.firstName;
                this.clan = this.idToData.transform(this.character.clan, this.dataService.clans.getValue())!;
                this.xp = this.character.xp;
                this.isRoad = !!this.character.road;
                this.road = this.character.road ? this.idToData.transform(this.character.road, this.dataService.roads.getValue()) : undefined;
                this.rank = this.idToData.transform(this.character.rank, this.dataService.ranks.getValue())!;
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.name + '-yellow.svg';
    }

    currentClanLogo() {
        return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name + '-white.svg' : '';
    }

    submit() {
        if (this.hasChanges()) {
            const requests: Observable<boolean>[] = [];
            if (this.village._id !== this.character.village)
                requests.push(this.characterService.setVillage(this.character._id, this.village._id, true));
            if (this.firstName !== this.character.firstName)
                requests.push(this.characterService.setFirstName(this.character._id, this.firstName, true));
            if (this.clan._id !== this.character.clan)
                requests.push(this.characterService.setClan(this.character._id, this.clan._id, true));
            if (this.xp !== this.character.xp)
                requests.push(this.characterService.setXp(this.character._id, this.xp, true));
            if (this.road?._id !== this.character.road || this.isRoad !== !!this.character.road)
                requests.push(this.characterService.setRoad(this.character._id, this.isRoad ? this.road?._id || "" : "", true));
            if (this.rank._id !== this.character.rank)
                requests.push(this.characterService.setRank(this.character._id, this.rank._id, true));
            this.characterService.multiRequest(requests).subscribe((overallSuccess) => {
                if (overallSuccess)
                    this.router.navigate(['..'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
                else
                    this.notificationService.showNotification('Erreur', 'Une erreur est survenue lors de la modification des informations du personnage. Si le problème persiste, contactez un administrateur.');
            });
        }
    }

    hasChanges() {
        return this.village._id !== this.character.village
            || this.firstName !== this.character.firstName
            || this.clan._id !== this.character.clan
            || this.xp !== this.character.xp
            || this.road?._id !== this.character.road
            || this.isRoad !== !!this.character.road
            || this.rank._id !== this.character.rank;
    }

    @HostListener("document:keydown", ["$event"])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter')
            this.submit();
        if (event.key === 'Escape')
            this.router.navigate(['..'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
}