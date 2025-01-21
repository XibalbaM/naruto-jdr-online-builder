import {Component, computed, ElementRef, HostListener, signal, ViewChild, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {Observable, take} from "rxjs";
import Character from "../../../app/models/character.interface";
import Village from "../../../app/models/village.interface";
import Road from "../../../app/models/road.interface";
import Environment from "../../../../environments/environment.interface";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import Rank from "../../../app/models/rank.interface";
import {Title} from "@angular/platform-browser";
import {CharacterToReamingXpPipe} from '../../../utils/pipes/character-to-reaming-xp.pipe';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor, NgIf, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {LongArrowLeftComponent} from '../../../utils/components/long-arrow-left/long-arrow-left.component';
import {ModalComponent} from "../../../utils/components/modal/modal.component";
import {PrivacySelectorComponent} from "../../../utils/components/privacy-selector/privacy-selector.component";
import {ImageFallbackDirective} from "../../../utils/directives/image-fallback.directive";

@Component({
    selector: 'app-edit-details',
    templateUrl: './edit-details.component.html',
    styleUrls: ['./edit-details.component.scss'],
    standalone: true,
    imports: [RouterLink, LongArrowLeftComponent, NgClass, FormsModule, NgFor, SpacerComponent, NgIf, TitleCasePipe, CharacterToReamingXpPipe, ModalComponent, NgOptimizedImage, PrivacySelectorComponent, ImageFallbackDirective]
})
export class EditDetailsComponent {
    clans = computed(() => [...this.dataService.clans.sort((a, b) => a.name.localeCompare(b.name)), {_id: "custom", name: "custom"}]);

    character!: Character;
    village!: Village;
    firstName!: string;
    clanId!: string;
    clanName?: string;
    xp!: number;
    isRoad!: boolean;
    road?: Road;
    rank!: Rank;
    shareStatus: WritableSignal<"public" | "not-referenced" | "private" | 'predrawn'> = signal("private");

    @ViewChild('changeClanConfirmation')
    clanConfirmModal!: ElementRef<HTMLDialogElement>;

    constructor(private router: Router, private route: ActivatedRoute, private auth: Auth,
                protected dataService: DataService, protected env: Environment, private idToData: IdToDataPipe,
                private characterService: CharacterService, private notificationService: NotificationService,
                private title: Title) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(params => {
            if (params.get('characterId') && this.auth.user!.characters.find((character) => character._id === params.get('characterId'))) {
                this.character = (this.auth.user!.characters.find((character) => character._id === params.get('characterId'))!);
                this.village = this.idToData.transform(this.character.village, this.dataService.villages)!;
                this.firstName = this.character.firstName;
                this.clanId = this.character.clan.id;
                this.clanName = this.clanId === 'custom' ? this.character.clan.clanName : undefined;
                this.xp = this.character.xp;
                this.isRoad = !!this.character.road;
                this.road = this.character.road ? this.idToData.transform(this.character.road, this.dataService.roads) : undefined;
                this.rank = this.idToData.transform(this.character.rank, this.dataService.ranks)!;
                this.shareStatus.set(this.character.shareStatus);
                this.title.setTitle(`${this.character.firstName} ${this.idToData.transform(this.character.clan, this.dataService.clans)?.name}, Modification — Fiche de personnage — Ninjadex`)
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    currentVillageLogo() {
        return this.env.api_url + '/assets/villages/' + this.village.name.toLowerCase() + '-yellow.svg';
    }

    currentClanLogo() {
        return this.clanId ? this.env.api_url + '/assets/clans/' + this.idToData.transform(this.clanId, this.dataService.clans)?.name.toLowerCase() + '-white.svg' : '';
    }

    submit() {
        if (this.hasChanges()) {
            if (this.clanId !== this.character.clan.id) {
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
        if (this.clanId !== this.character.clan.id || this.clanId === 'custom' && this.clanName !== this.character.clan.clanName)
            requests.push(this.characterService.setClan(this.character._id, {id: this.clanId, clanName: this.clanName}, true));
        if (this.xp !== this.character.xp)
            requests.push(this.characterService.setXp(this.character._id, this.xp, true));
        if (this.road?._id !== this.character.road || this.isRoad !== !!this.character.road)
            requests.push(this.characterService.setRoad(this.character._id, this.isRoad ? this.road?._id || "" : "", true));
        if (this.rank._id !== this.character.rank)
            requests.push(this.characterService.setRank(this.character._id, this.rank._id, true));
        if (this.shareStatus() !== this.character.shareStatus && this.shareStatus() !== 'predrawn')
            requests.push(this.characterService.setShareStatus(this.character._id, this.shareStatus() as any, true));
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
            || this.clanId !== this.character.clan.id
            || this.clanId === 'custom' && this.clanName !== this.character.clan.clanName
            || this.xp !== this.character.xp
            || this.road?._id !== this.character.road
            || this.isRoad !== !!this.character.road
            || this.rank._id !== this.character.rank
            || this.shareStatus() !== this.character.shareStatus;
    }

    @HostListener("document:keydown", ["$event"])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter')
            this.submit();
        if (event.key === 'Escape')
            this.router.navigate(['..'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
}