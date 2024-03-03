import {Component, inject, Injector, OnInit} from '@angular/core';
import {combineLatest} from "rxjs";
import ChakraSpe from "../../../app/models/chakra-spe.model";
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../../app/services/data.service";
import {CharacterService} from "../../services/character.service";
import {NotificationService} from "../../../app/services/notification.service";
import {FormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';

@Component({
    selector: 'app-set-chakra-spe',
    templateUrl: './set-chakra-spe.component.html',
    styleUrls: ['./set-chakra-spe.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule]
})
export class SetChakraSpeComponent implements OnInit {

    id!: number;
    ownedSpes: Map<string, number> = new Map()
    spes!: ChakraSpe[];
    characterId!: string;
    selectedSpe?: ChakraSpe;

    constructor(private auth: Auth, private route: ActivatedRoute, private title: Title,
                private idToData: IdToDataPipe, protected dataService: DataService, private router: Router,
                private characterService: CharacterService, private notificationService: NotificationService,
                private injector: Injector) {
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded(this.injector)]).subscribe(([params, user]) => {
            if (params.get('characterId') && params.get('id') && Number(params.get('id')) < 14 && user.characters.find((character) => character._id === params.get('characterId'))) {
                const character = user.characters.find((character) => character._id === params.get('characterId'))!;
                this.id = Number(params.get('id'));
                character.chakraSpes.forEach(spe => {
                    if (this.ownedSpes.has(spe)) {
                        this.ownedSpes.set(spe, this.ownedSpes.get(spe)! + 1);
                    } else {
                        this.ownedSpes.set(spe, 1);
                    }
                });
                if (character.chakraSpes[this.id]) {
                    if (this.ownedSpes.get(character.chakraSpes[this.id]) === 1) {
                        this.ownedSpes.delete(character.chakraSpes[this.id]);
                    } else {
                        this.ownedSpes.set(character.chakraSpes[this.id], this.ownedSpes.get(character.chakraSpes[this.id])! - 1);
                    }
                }

                this.characterId = params.get('characterId')!;
                this.spes = this.dataService.chakraSpes.filter(spe => (this.ownedSpes.get(spe._id) || 0) < spe.max)
                this.title.setTitle(`${character.firstName} ${this.idToData.transform(character.clan, this.dataService.clans)?.name}, Spécialisation de chakra n°${this.id + 1} — Fiche de personnage — Naruto jdr`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    selectSpe() {
        if (this.selectedSpe && this.selectedSpe.max > (this.ownedSpes.get(this.selectedSpe._id) || 0)) {
            this.characterService.setChakraSpe(this.characterId, this.id, this.selectedSpe._id).subscribe((success) => {
                if (success) {
                    this.notificationService.showNotification("Spécialisation de chakra", `Spécialisation de chakra n°${this.id + 1} choisie avec succès (${this.selectedSpe?.name})`);
                    this.router.navigate(['/personnages', this.characterId, 'specialisations-de-chakra']);
                } else {
                    this.notificationService.showNotification("Erreur", `Erreur lors de la sélection de la spécialisation de chakra n°${this.id + 1} (${this.selectedSpe?.name})`);
                }
            })
        }
    }
}
