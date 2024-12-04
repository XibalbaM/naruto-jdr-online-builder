import {Component, computed, OnInit, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from '../../../utils/pipes/id-to-data.pipe';
import {NgClass, NgFor, NgOptimizedImage} from '@angular/common';
import {BgComponent} from "../../../utils/components/bg/bg.component";
import {FormsModule} from "@angular/forms";
import {PredrawnCharacter} from "../../../app/models/character.interface";
import {PredrawnService} from "../../../app/services/predrawn.service";
import {CharacterListPreviewComponent} from "../character-list-preview/character-list-preview.component";
import {group} from "@angular/animations";

@Component({
    selector: 'app-predrawn',
    templateUrl: './predrawn.component.html',
    styleUrls: ['./predrawn.component.scss'],
    standalone: true,
    imports: [ NgFor, BgComponent, NgClass, NgOptimizedImage, FormsModule, CharacterListPreviewComponent]
})
export class PredrawnComponent implements OnInit {

    greatRanks = [...new Set(this.dataService.ranks.map((rank) => rank.name.split(",")[0]))]
    predrawns = signal<PredrawnCharacter[]>([])
    ranks = computed(() =>
        ["Tous", ...this.greatRanks]
            .map((rank) => ({name: rank, characters: this.getCharacters(rank)}))
    );
    currentRankName = signal("Tous");
    currentRank = computed(() => this.ranks().find((rank) => rank.name === this.currentRankName())!);
    search = signal("");

    constructor(protected auth: Auth, protected predrawnService: PredrawnService, protected dataService: DataService,
                private idToDataPipe: IdToDataPipe) {
    }

    ngOnInit() {
        this.predrawnService.getPredrawnCharacters().subscribe((characters) => {
            this.predrawns.set(characters);
        });
    }

    private getCharacters(rank: string): { characters: PredrawnCharacter[], groups: {rank: string, characters: PredrawnCharacter[]}[] } {
        let characters =  this.predrawns().filter((character) => {
            if (rank !== "Tous" && !this.idToDataPipe.transform(character.rank, this.dataService.ranks)!.name.startsWith(rank)) {
                return false;
            }
            let name = character.firstName + " " + this.idToDataPipe.transform(character.clan, this.dataService.clans)!.name;
            return !(this.search() && !name.toLowerCase().includes(this.search().toLowerCase()));
        });
        console.log(characters);
        return {
            characters,
            groups: this.greatRanks.map((rank) => ({
                rank,
                characters: characters.filter((character) => this.idToDataPipe.transform(character.rank, this.dataService.ranks)!.name.includes(rank))
            })).filter((group) => group.characters.length > 0)
        }
    }

    protected readonly group = group;
}