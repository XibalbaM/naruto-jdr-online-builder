import {Component, OnInit} from '@angular/core';
import {combineLatest} from "rxjs";
import Auth from "../../../app/models/auth.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {DataService} from "../../../app/services/data.service";
import ChakraSpe from "../../../app/models/chakra-spe.model";
import {CharacterToMaxChakraSpesPipe} from "../../pipes/character-to-max-chakra-spes.pipe";
import {ArrowRightComponent} from '../../../utils/components/arrow-right/arrow-right.component';
import {NgFor, NgIf} from '@angular/common';

@Component({
    selector: 'app-chrakra-spes',
    templateUrl: './chakra-spes.component.html',
    styleUrls: ['./chakra-spes.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, ArrowRightComponent]
})
export class ChakraSpesComponent implements OnInit {

    chakraSpes!: { data: ChakraSpe | string, unlocked: boolean }[];
    reamingChakraSpes!: number;
    ranks = [
        "Aspirant ninja",
        "Rang D",
        "Rang C",
        "Rang C",
        "Rang B",
        "Rang B",
        "Rang A",
        "Rang A",
        "Rang A",
        "Rang S",
        "Rang S",
        "Rang S",
        "Rang S",
        "Rang S"
    ]

    constructor(private auth: Auth, private route: ActivatedRoute, private title: Title,
                private idToData: IdToDataPipe, private dataService: DataService, private router: Router,
                private characterToMaxChakraSpes: CharacterToMaxChakraSpesPipe) {
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.auth.userObservableOnceLoaded()]).subscribe(([params, user]) => {
            if (params.get('characterId') && user.characters.find((character) => character._id === params.get('characterId'))) {
                const character = user.characters.find((character) => character._id === params.get('characterId'))!;
                const datas: (string | ChakraSpe)[] = character.chakraSpes.map(spe => this.idToData.transform(spe, this.dataService.chakraSpes.getValue())!);
                while (datas.length < 14) {
                    datas.push(this.ranks[datas.length]);
                }
                const maxChakraSpes = this.characterToMaxChakraSpes.transform(character);
                this.chakraSpes = datas.map((data, i) => ({data, unlocked: i < maxChakraSpes}));
                this.reamingChakraSpes = maxChakraSpes - character.chakraSpes.length;
                this.title.setTitle(`${character.firstName} ${this.idToData.transform(character.clan, this.dataService.clans.getValue())?.name}, Spécialisations de chakra — Fiche de personnage — Naruto jdr`);
            } else {
                this.router.navigate(['/personnages']);
            }
        });
    }

    isChakraSpe(spe: { data: ChakraSpe | string, unlocked: boolean }): spe is { data: ChakraSpe, unlocked: boolean } {
        return typeof spe.data !== 'string';
    }
}
