import {Component, computed, Input, Signal, signal} from '@angular/core';
import Character from "../../../app/models/character.interface";
import {DataService} from "../../../app/services/data.service";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
import {BgComponent} from "../../../utils/components/bg/bg.component";
import {CharacterListPreviewComponent} from "../character-list-preview/character-list-preview.component";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-public-character-list',
  standalone: true,
    imports: [
        BgComponent,
        CharacterListPreviewComponent,
        FormsModule,
        NgForOf,
        NgOptimizedImage,
        NgClass
    ],
  templateUrl: './public-character-list.component.html',
  styleUrl: './public-character-list.component.scss'
})
export class PublicCharacterListComponent {

    @Input()
    characters!: Signal<Character[]>;

    greatRanks = [...new Set(this.dataService.ranks.map((rank) => rank.name.split(",")[0]))]
    ranks = computed(() =>
        ["Tous", ...this.greatRanks]
            .map((rank) => ({name: rank, characters: this.getCharacters(rank)}))
    );
    currentRankName = signal("Tous");
    currentRank = computed(() => this.ranks().find((rank) => rank.name === this.currentRankName())!);
    search = signal("");

    constructor(protected dataService: DataService, private idToDataPipe: IdToDataPipe) {
    }

    private getCharacters(rank: string): { characters: Character[], groups: {rank: string, characters: Character[]}[] } {
        let characters =  this.characters().filter((character) => {
            if (rank !== "Tous" && !this.idToDataPipe.transform(character.rank, this.dataService.ranks)!.name.startsWith(rank)) {
                return false;
            }
            let name = character.firstName + " " + this.idToDataPipe.transform(character.clan, this.dataService.clans)!.name;
            return !(this.search() && !name.toLowerCase().includes(this.search().toLowerCase()));
        });
        return {
            characters,
            groups: this.greatRanks.map((rank) => ({
                rank,
                characters: characters.filter((character) => this.idToDataPipe.transform(character.rank, this.dataService.ranks)!.name.includes(rank))
            })).filter((group) => group.characters.length > 0)
        }
    }
}