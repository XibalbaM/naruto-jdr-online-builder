import {Component, computed, ElementRef, HostListener, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {Observable, take} from "rxjs";
import Character from "../../../app/models/character.model";
import Village from "../../../app/models/village.model";
import Clan from "../../../app/models/clan.model";
import Road from "../../../app/models/road.model";
import Environment from "../../../../environments/environment.interface";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Rank from "../../../app/models/rank.model";
import {Title} from "@angular/platform-browser";
import {CharacterToReamingXpPipe} from '../../../utils/pipes/character-to-reaming-xp.pipe';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgClass, NgFor, NgIf, TitleCasePipe} from '@angular/common';
import {LongArrowLeftComponent} from '../../../utils/components/long-arrow-left/long-arrow-left.component';
import {ModalComponent} from "../../../utils/components/modal/modal.component";

@Component({
    selector: 'app-edit-details',
    templateUrl: './edit-details.component.html',
    styleUrls: ['./edit-details.component.scss'],
    standalone: true,
    imports: [RouterLink, LongArrowLeftComponent, NgClass, FormsModule, NgFor, SpacerComponent, NgIf, AsyncPipe, TitleCasePipe, CharacterToReamingXpPipe, ModalComponent, IdToDataPipe]
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
    clans = computed(() => this.dataService.clans.sort((a, b) => a.name.localeCompare(b.name)));
    @ViewChild('changeClanConfirmation')
    clanConfirmModal!: ElementRef<HTMLDialogElement>;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth,
                protected dataService: DataService, private env: Environment, private idToData: IdToDataPipe,
                private characterService: CharacterService, private notificationService: NotificationService,
                private title: Title) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(params => {
            if (params.get('characterId') && this.auth.user!.characters.find((character) => character._id === params.get('characterId'))) {
                this.character = (this.auth.user!.characters.find((character) => character._id === params.get('characterId'))!);
                this.village = this.idToData.transform(this.character.village, this.dataService.villages)!;
                this.firstName = this.character.firstName;
                this.clan = this.idToData.transform(this.character.clan, this.dataService.clans)!;
                this.xp = this.character.xp;
                this.isRoad = !!this.character.road;
                this.road = this.character.road ? this.idToData.transform(this.character.road, this.dataService.roads) : undefined;
                this.rank = this.idToData.transform(this.character.rank, this.dataService.ranks)!;
                this.title.setTitle(`${this.character.firstName} ${this.clan.name}, Modification — Fiche de personnage — Ninjadex`)
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.name.toLowerCase() + '-yellow.svg';
    }

    currentClanLogo() {
        return this.clan ? this.env.api_url + '/assets/clans/' + this.clan.name.toLowerCase() + '-white.svg' : '';
    }

    submit() {
        if (this.hasChanges()) {
            if (this.clan._id !== this.character.clan) {
                this.clanConfirmModal.nativeElement.show();
            } else {
                this.processSubmit();
            }
        }
    }

    processSubmit() {
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